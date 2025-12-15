import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import { logger } from '../utils/logger.js';
import { JobStatus } from '../domain/enums/job-status.enum.js';

import { PostgresClient } from '../infra/db/postgres.client.js';
import { QueueClient } from '../infra/queue/queue.client.js';
import { RedisClient } from '../infra/cache/redis.client.js';

export class JobService {
  private db: PostgresClient;
  private queue: QueueClient;
  private cache: RedisClient;

  constructor() {
    this.db = new PostgresClient();
    this.queue = new QueueClient();
    this.cache = new RedisClient();
  }

  /**
   * Create a new bulk upload job
   */
  async createJob(payload: {
    fileName: string;
    totalRows?: number;
  }) {
    const jobId = uuidv4();

    const job = {
      id: jobId,
      fileName: payload.fileName,
      totalRows: payload.totalRows ?? 0,
      status: JobStatus.CREATED,
      createdAt: new Date(),
    };

    await this.db.createJob(job);
    await this.cache.initializeJobCounters(jobId);

    logger.info(`Job created`, { jobId });

    return {
      jobId,
      status: job.status,
    };
  }


  async completeUpload(jobId: string) {
    const job = await this.db.getJobById(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    if (job.status !== JobStatus.CREATED) {
      throw new Error('Upload already completed or job not in valid state');
    }

    await this.db.updateJobStatus(jobId, JobStatus.PROCESSING);

    // Create logical batches (range based)
    const batchSize = 10_000;
    const totalRows = job.totalRows;

    for (let start = 0; start < totalRows; start += batchSize) {
      const end = Math.min(start + batchSize, totalRows);

      await this.queue.enqueue({
        jobId,
        startRow: start,
        endRow: end,
      });
    }

    logger.info('Upload completed, batches enqueued', { jobId });

    return { jobId };
  }

  /**
   * List all jobs
   */
  async listJobs() {
    return this.db.listJobs();
  }

  /**
   * Get a single job with status
   */
  async getJob(jobId: string) {
    const job = await this.db.getJobById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    const counters = await this.cache.getJobCounters(jobId);

    return {
      ...job,
      progress: counters,
    };
  }

  /**
   * Pause / Resume / Retry job
   */
  async updateJobState(
    jobId: string,
    action: 'pause' | 'resume' | 'retry_failed'
  ) {
    const job = await this.db.getJobById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    switch (action) {
      case 'pause':
        await this.db.updateJobStatus(jobId, JobStatus.PAUSED);
        logger.info('Job paused', { jobId });
        break;

      case 'resume':
        await this.db.updateJobStatus(jobId, JobStatus.PROCESSING);
        logger.info('Job resumed', { jobId });
        break;

      case 'retry_failed':
        await this.queue.enqueueRetry(jobId);
        logger.info('Retry failed rows triggered', { jobId });
        break;

      default:
        throw new Error('Invalid action');
    }

    return { jobId, action };
  }

  /**
   * Stream failed rows as CSV
   */
  async getFailedRows(jobId: string): Promise<Readable> {
    return this.db.streamFailedRows(jobId);
  }
}
