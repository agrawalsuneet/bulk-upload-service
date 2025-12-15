import { logger } from '../../utils/logger.js';
export class QueueClient {
    async enqueue(message) {
        logger.info('Enqueuing batch message', message);
    }
    async enqueueRetry(jobId) {
        logger.info('Enqueuing retry for failed batches', { jobId });
    }
    async poll() {
        return null;
    }
}
//# sourceMappingURL=queue.client.js.map