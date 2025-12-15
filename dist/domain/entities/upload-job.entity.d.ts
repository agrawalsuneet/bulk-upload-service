import { JobStatus } from '../enums/job-status.enum.js';
export interface UploadJobProps {
    id: string;
    fileName: string;
    totalRows: number;
    status: JobStatus;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class UploadJob {
    private props;
    constructor(props: UploadJobProps);
    get id(): string;
    get status(): JobStatus;
    canStartProcessing(): boolean;
    canPause(): boolean;
    canResume(): boolean;
    markProcessing(): void;
    markPaused(): void;
    markCompleted(): void;
    markFailed(): void;
    toJSON(): {
        id: string;
        fileName: string;
        totalRows: number;
        status: JobStatus;
        createdAt: Date;
        updatedAt?: Date;
    };
}
//# sourceMappingURL=upload-job.entity.d.ts.map