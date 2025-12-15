import { JobService } from '../../services/job.service.js';
export class JobController {
    constructor() {
        /**
         * POST /jobs
         */
        this.createJob = async (req, res, next) => {
            try {
                const job = await this.jobService.createJob(req.body);
                res.status(201).json(job);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * POST /jobs/:jobId/complete-upload
         */
        this.completeUpload = async (req, res, next) => {
            try {
                const { jobId } = req.params;
                await this.jobService.completeUpload(jobId);
                res.status(200).json({ message: 'Upload completed successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * GET /jobs
         */
        this.listJobs = async (_req, res, next) => {
            try {
                const jobs = await this.jobService.listJobs();
                res.status(200).json(jobs);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * GET /jobs/:jobId
         */
        this.getJob = async (req, res, next) => {
            try {
                const { jobId } = req.params;
                const job = await this.jobService.getJob(jobId);
                res.status(200).json(job);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * PATCH /jobs/:jobId
         * body: { action: 'pause' | 'resume' | 'retry_failed' }
         */
        this.updateJobState = async (req, res, next) => {
            try {
                const { jobId } = req.params;
                const { action } = req.body;
                const result = await this.jobService.updateJobState(jobId, action);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * GET /jobs/:jobId/failed-rows
         */
        this.downloadFailedRows = async (req, res, next) => {
            try {
                const { jobId } = req.params;
                const stream = await this.jobService.getFailedRows(jobId);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="failed-rows-${jobId}.csv"`);
                stream.pipe(res);
            }
            catch (error) {
                next(error);
            }
        };
        this.jobService = new JobService();
    }
}
//# sourceMappingURL=job.controller.js.map