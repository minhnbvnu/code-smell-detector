function buildJobObject(operation, status, jobDocument, inProgress, failed, succeeded) {
        var job = {};

        job.id = '1234';
        job.document = jobDocument;
        job.operation = operation;
        job.status = status;
        job.inProgress = inProgress;
        job.failed = failed;
        job.succeeded = succeeded;

        return job;
    }