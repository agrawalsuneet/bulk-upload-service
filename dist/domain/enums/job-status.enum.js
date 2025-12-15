export var JobStatus;
(function (JobStatus) {
    JobStatus[JobStatus["CREATED"] = 1] = "CREATED";
    JobStatus[JobStatus["PROCESSING"] = 2] = "PROCESSING";
    JobStatus[JobStatus["PAUSED"] = 3] = "PAUSED";
    JobStatus[JobStatus["COMPLETED"] = 4] = "COMPLETED";
    JobStatus[JobStatus["FAILED"] = 5] = "FAILED";
})(JobStatus || (JobStatus = {}));
//# sourceMappingURL=job-status.enum.js.map