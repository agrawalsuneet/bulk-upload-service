import { Readable } from 'stream';
import { JobStatus } from '../../domain/enums/job-status.enum.js';
export declare class PostgresClient {
    constructor();
    createJob(job: {
        id: string;
        fileName: string;
        totalRows: number;
        status: JobStatus;
        createdAt: Date;
    }): Promise<void>;
    getJobById(jobId: string): Promise<any | null>;
    updateJobStatus(jobId: string, status: JobStatus): Promise<void>;
    listJobs(): Promise<any[]>;
    streamFailedRows(jobId: string): Promise<Readable>;
}
//# sourceMappingURL=postgres.client.d.ts.map