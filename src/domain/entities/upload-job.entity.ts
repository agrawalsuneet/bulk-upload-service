import { JobStatus } from '../enums/job-status.enum.js';

export interface UploadJobProps {
  id: string;
  fileName: string;
  totalRows: number;
  status: JobStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export class UploadJob {
  private props: UploadJobProps;

  constructor(props: UploadJobProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get status(): JobStatus {
    return this.props.status;
  }

  canStartProcessing(): boolean {
    return this.props.status === JobStatus.CREATED;
  }

  canPause(): boolean {
    return this.props.status === JobStatus.PROCESSING;
  }

  canResume(): boolean {
    return this.props.status === JobStatus.PAUSED;
  }

  markProcessing(): void {
    if (!this.canStartProcessing()) {
      throw new Error('Job cannot be moved to PROCESSING state');
    }
    this.props.status = JobStatus.PROCESSING;
  }

  markPaused(): void {
    if (!this.canPause()) {
      throw new Error('Job cannot be paused');
    }
    this.props.status = JobStatus.PAUSED;
  }

  markCompleted(): void {
    this.props.status = JobStatus.COMPLETED;
  }

  markFailed(): void {
    this.props.status = JobStatus.FAILED;
  }

  toJSON() {
    return { ...this.props };
  }
}
