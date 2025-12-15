import { Request, Response, NextFunction } from 'express';
export declare class JobController {
    private jobService;
    constructor();
    /**
     * POST /jobs
     */
    createJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * POST /jobs/:jobId/complete-upload
     */
    completeUpload: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * GET /jobs
     */
    listJobs: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * GET /jobs/:jobId
     */
    getJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * PATCH /jobs/:jobId
     * body: { action: 'pause' | 'resume' | 'retry_failed' }
     */
    updateJobState: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * GET /jobs/:jobId/failed-rows
     */
    downloadFailedRows: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=job.controller.d.ts.map