function restartPackage(job) {
   if (!isUndefined(job.document.packageName)) {
      job.inProgress({ operation: job.operation, step: 'stopping running package' }, function(err) { 
         showJobsError(err);
         stopPackage(job.document.packageName, function (err) {
            if (isUndefined(err)) {
               startPackageFromJob(job);
            } else {
               job.failed({ operation: job.operation, errorCode: 'ERR_UNABLE_TO_STOP_PACKAGE', errorMessage: 'unable to stop package for restart' }, showJobsError);
            }
         });
      });
   } else {
      job.failed({ operation: job.operation, errorCode: 'ERR_UNNAMED_PACKAGE', errorMessage: 'no packageName property specified' }, showJobsError);
   }
}