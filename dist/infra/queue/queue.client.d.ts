type BatchMessage = {
    jobId: string;
    startRow: number;
    endRow: number;
};
export declare class QueueClient {
    enqueue(message: BatchMessage): Promise<void>;
    enqueueRetry(jobId: string): Promise<void>;
    poll(): Promise<BatchMessage | null>;
}
export {};
//# sourceMappingURL=queue.client.d.ts.map