import { JobStatus } from '../enums/job-status.enum.js';

export interface JobModel {
  id: string;
  fileName: string;
  totalRows: number;
  status: JobStatus;
  createdAt: Date;
  updatedAt?: Date;
}
