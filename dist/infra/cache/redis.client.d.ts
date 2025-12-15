type JobCounters = {
    processed: number;
    succeeded: number;
    failed: number;
};
export declare class RedisClient {
    private store;
    initializeJobCounters(jobId: string): Promise<void>;
    incrementProcessed(jobId: string, count?: number): Promise<void>;
    incrementSucceeded(jobId: string, count?: number): Promise<void>;
    incrementFailed(jobId: string, count?: number): Promise<void>;
    getJobCounters(jobId: string): Promise<JobCounters | null>;
}
export {};
//# sourceMappingURL=redis.client.d.ts.map