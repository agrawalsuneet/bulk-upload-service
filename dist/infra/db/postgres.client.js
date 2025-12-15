import { Readable } from 'stream';
import { logger } from '../../utils/logger.js';
import { JobStatus } from '../../domain/enums/job-status.enum.js';
export class PostgresClient {
    constructor() {
        logger.info('PostgresClient initialized');
    }
    async createJob(job) {
        logger.info('Creating job in DB', job);
    }
    async getJobById(jobId) {
        // SELECT * FROM bulk_upload_jobs WHERE job_id = ?
        logger.info('Fetching job from DB', { jobId });
        // Mocked response for now
        return {
            id: jobId,
            fileName: 'users.csv',
            totalRows: 1000000,
            status: JobStatus.CREATED,
            createdAt: new Date(),
        };
    }
    async updateJobStatus(jobId, status) {
        //UPDATE bulk_upload_jobs SET status = ?
        logger.info('Updating job status', { jobId, status });
    }
    async listJobs() {
        //SELECT * FROM bulk_upload_jobs ORDER BY created_at DESC
        logger.info('Listing jobs');
        return [];
    }
    async streamFailedRows(jobId) {
        //streaming failed rows as CSV
        logger.info('Streaming failed rows', { jobId });
        const stream = new Readable({
            read() {
                this.push('row_number,row_data,error_message\n');
                this.push(null);
            },
        });
        return stream;
    }
}
//# sourceMappingURL=postgres.client.js.map