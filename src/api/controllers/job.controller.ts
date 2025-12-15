import { Request, Response, NextFunction } from 'express';
import { JobService } from '../../services/job.service.js';

export class JobController {
  private jobService: JobService;

  constructor() {
    this.jobService = new JobService();
  }

  /**
   * POST /jobs
   */
  createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const job = await this.jobService.createJob(req.body);
      res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /jobs/:jobId/complete-upload
   */
  completeUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.params;
      await this.jobService.completeUpload(jobId);
      res.status(200).json({ message: 'Upload completed successfully' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /jobs
   */
  listJobs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await this.jobService.listJobs();
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /jobs/:jobId
   */
  getJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.params;
      const job = await this.jobService.getJob(jobId);
      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PATCH /jobs/:jobId
   * body: { action: 'pause' | 'resume' | 'retry_failed' }
   */
  updateJobState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.params;
      const { action } = req.body;

      const result = await this.jobService.updateJobState(jobId, action);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /jobs/:jobId/failed-rows
   */
  downloadFailedRows = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.params;
      const stream = await this.jobService.getFailedRows(jobId);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="failed-rows-${jobId}.csv"`
      );

      stream.pipe(res);
    } catch (error) {
      next(error);
    }
  };
}
