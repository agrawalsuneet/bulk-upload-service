import { JobStatus } from '../enums/job-status.enum.js';
export class UploadJob {
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get status() {
        return this.props.status;
    }
    canStartProcessing() {
        return this.props.status === JobStatus.CREATED;
    }
    canPause() {
        return this.props.status === JobStatus.PROCESSING;
    }
    canResume() {
        return this.props.status === JobStatus.PAUSED;
    }
    markProcessing() {
        if (!this.canStartProcessing()) {
            throw new Error('Job cannot be moved to PROCESSING state');
        }
        this.props.status = JobStatus.PROCESSING;
    }
    markPaused() {
        if (!this.canPause()) {
            throw new Error('Job cannot be paused');
        }
        this.props.status = JobStatus.PAUSED;
    }
    markCompleted() {
        this.props.status = JobStatus.COMPLETED;
    }
    markFailed() {
        this.props.status = JobStatus.FAILED;
    }
    toJSON() {
        return { ...this.props };
    }
}
//# sourceMappingURL=upload-job.entity.js.map