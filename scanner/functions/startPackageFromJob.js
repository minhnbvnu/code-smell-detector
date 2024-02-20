function startPackageFromJob(job) {
   if (!isUndefined(job.document.packageName)) {
      var package = installedPackages.find(function(element) { 
         return (element.packageName === job.document.packageName); 
      });

      if (isUndefined(package)) {
         job.failed({ operation: job.operation, errorCode: 'ERR_INVALID_PACKAGE_NAME', errorMessage: 'no package installed called: ' + job.document.packageName }, showJobsError);
         return;
      }

      job.inProgress({ operation: job.operation, step: 'starting package, checking stability' }, function(err) { 
         showJobsError(err);
         startPackage(package, function(err) {
            if (isUndefined(err)) {
               job.succeeded({ operation: job.operation, state: 'package started' }, showJobsError);
            } else {
               job.failed({ operation: job.operation, errorCode: 'ERR_UNABLE_TO_START_PACKAGE', errorMessage: errorToString(err) }, showJobsError);
            }
         });
      });
   } else {
      job.failed({ operation: job.operation, errorCode: 'ERR_UNNAMED_PACKAGE', errorMessage: 'no packageName property specified' }, showJobsError);
   }
}