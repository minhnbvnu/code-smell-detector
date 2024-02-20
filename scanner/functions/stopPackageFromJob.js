function stopPackageFromJob(job) {
   if (!isUndefined(job.document.packageName)) {
      stopPackage(job.document.packageName, function(err) {
         if (isUndefined(err)) {
            job.succeeded({ operation: job.operation, state: 'package stopped' }, showJobsError);
         } else {
            job.failed({ operation: job.operation, errorCode: 'ERR_UNABLE_TO_STOP_PACKAGE', errorMessage: errorToString(err) }, showJobsError);
         }
      });
   } else {
      job.failed({ operation: job.operation, errorCode: 'ERR_UNNAMED_PACKAGE', errorMessage: 'no packageName property specified' }, showJobsError);
   }
}