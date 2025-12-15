import { logger } from '../../utils/logger.js';

type JobCounters = {
  processed: number;
  succeeded: number;
  failed: number;
};

export class RedisClient {
  private store: Map<string, JobCounters> = new Map();

  async initializeJobCounters(jobId: string): Promise<void> {
    this.store.set(jobId, { processed: 0, succeeded: 0, failed: 0 });
    logger.info('Initialized job counters', { jobId });
  }

  async incrementProcessed(jobId: string, count = 1): Promise<void> {
    const counters = this.store.get(jobId);
    if (!counters) return;
    counters.processed += count;
  }

  async incrementSucceeded(jobId: string, count = 1): Promise<void> {
    const counters = this.store.get(jobId);
    if (!counters) return;
    counters.succeeded += count;
  }

  async incrementFailed(jobId: string, count = 1): Promise<void> {
    const counters = this.store.get(jobId);
    if (!counters) return;
    counters.failed += count;
  }

  async getJobCounters(jobId: string): Promise<JobCounters | null> {
    return this.store.get(jobId) ?? null;
  }
}
