import { logger } from '../../utils/logger.js';

type BatchMessage = {
  jobId: string;
  startRow: number;
  endRow: number;
};

export class QueueClient {
  async enqueue(message: BatchMessage): Promise<void> {
    logger.info('Enqueuing batch message', message);
  }

  async enqueueRetry(jobId: string): Promise<void> {
    logger.info('Enqueuing retry for failed batches', { jobId });
  }

  async poll(): Promise<BatchMessage | null> {
    return null;
  }
}
