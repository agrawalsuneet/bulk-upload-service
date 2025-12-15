import { Readable } from 'stream';
import { JobStatus } from '../domain/enums/job-status.enum.js';
export declare class JobService {
    private db;
    private queue;
    private cache;
    constructor();
    /**
     * Create a new bulk upload job
     */
    createJob(payload: {
        fileName: string;
        totalRows?: number;
    }): Promise<{
        jobId: string;
        status: JobStatus;
    }>;
    /**
     * Called after multipart upload is completed successfully
     * Triggers batch creation and async processing
     */
    completeUpload(jobId: string): Promise<{
        jobId: string;
    }>;
    /**
     * List all jobs
     */
    listJobs(): Promise<any[]>;
    /**
     * Get a single job with status
     */
    getJob(jobId: string): Promise<any>;
    /**
     * Pause / Resume / Retry job
     */
    updateJobState(jobId: string, action: 'pause' | 'resume' | 'retry_failed'): Promise<{
        jobId: string;
        action: "pause" | "resume" | "retry_failed";
    }>;
    /**
     * Stream failed rows as CSV
     */
    getFailedRows(jobId: string): Promise<Readable>;
}
//# sourceMappingURL=job.service.d.ts.map