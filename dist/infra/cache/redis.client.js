import { logger } from '../../utils/logger.js';
export class RedisClient {
    constructor() {
        this.store = new Map();
    }
    async initializeJobCounters(jobId) {
        this.store.set(jobId, { processed: 0, succeeded: 0, failed: 0 });
        logger.info('Initialized job counters', { jobId });
    }
    async incrementProcessed(jobId, count = 1) {
        const counters = this.store.get(jobId);
        if (!counters)
            return;
        counters.processed += count;
    }
    async incrementSucceeded(jobId, count = 1) {
        const counters = this.store.get(jobId);
        if (!counters)
            return;
        counters.succeeded += count;
    }
    async incrementFailed(jobId, count = 1) {
        const counters = this.store.get(jobId);
        if (!counters)
            return;
        counters.failed += count;
    }
    async getJobCounters(jobId) {
        return this.store.get(jobId) ?? null;
    }
}
//# sourceMappingURL=redis.client.js.map