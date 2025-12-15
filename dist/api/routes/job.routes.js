import { Router } from 'express';
import { JobController } from '../controllers/job.controller.js';
const router = Router();
const controller = new JobController();
/**
 * Create a new bulk upload job
 */
router.post('/', controller.createJob);
/**
 * Mark upload as completed (after multipart upload finishes)
 */
router.post('/:jobId/complete-upload', controller.completeUpload);
/**
 * List all jobs
 */
router.get('/', controller.listJobs);
/**
 * Get job details / status
 */
router.get('/:jobId', controller.getJob);
/**
 * Download failed rows for a job
 */
router.get('/:jobId/failed-rows', controller.downloadFailedRows);
/**
 * Pause / Resume / Retry a job
 */
router.patch('/:jobId', controller.updateJobState);
export const jobRoutes = router;
//# sourceMappingURL=job.routes.js.map