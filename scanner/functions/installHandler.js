function installHandler(job) {
   // Check if the install job has not yet been started
   if (job.status.status === 'QUEUED') {
      if (isUndefined(job.document.packageName)) {
         job.failed({ operation: job.operation, errorCode: 'ERR_UNNAMED_PACKAGE', errorMessage: 'installed packages must have packageName property' }, showJobsError);
         return;
      }

      if (isUndefined(job.document.files) || !(job.document.files instanceof Array) || (job.document.files.length === 0)) {
         job.failed({ operation: job.operation, errorCode: 'ERR_FILE_COPY_FAILED', errorMessage: 'files property missing or invalid' }, showJobsError);
         return;
      }

      backupFiles(job, function(backupError) {
         if (isUndefined(backupError)) {
            downloadFiles(job, function(downloadError) {
               if (isUndefined(downloadError)) {
                  if (!isUndefined(job.document.launchCommand) && job.document.autoStart) {
                     job.inProgress({ operation: job.operation, step: 'restarting package' }, function(err) { 
                        showJobsError(err);
                        stopPackage(job.document.packageName, function (err) {
                           if (isUndefined(err)) {
                              startPackage(job.document, function (err) {
                                 if (isUndefined(err)) {
                                    updateInstalledPackage(job.document);
                                    job.succeeded({ operation: job.operation, state: 'package installed and started' }, showJobsError);
                                 } else {
                                    rollbackFiles(job, function(rollbackError) {
                                       if (isUndefined(rollbackError)) {
                                          var package = installedPackages.find(function(element) { 
                                             return (element.packageName === job.document.packageName); 
                                          });

                                          if (isUndefined(package) || isUndefined(package.autoStart) || !package.autoStart) {
                                             job.failed({ operation: job.operation, errorCode: 'ERR_UNEXPECTED_PACKAGE_EXIT', errorMessage: errorToString(err) }, showJobsError);
                                          } else {
                                             startPackage(package, function (err) {
                                                job.failed({ operation: job.operation, errorCode: 'ERR_UNEXPECTED_PACKAGE_EXIT', errorMessage: errorToString(err) }, showJobsError);
                                             });
                                          }
                                       } else {
                                          job.failed({ operation: job.operation, errorCode: 'ERR_UNEXPECTED_PACKAGE_EXIT', 
                                                       errorMessage: errorToString(err), rollbackError: errorToString(rollbackError) }, showJobsError);
                                       }
                                    });
                                 }
                              });
                           } else {
                              rollbackFiles(job, function(rollbackError) {
                                 job.failed({ operation: job.operation, errorCode: 'ERR_UNABLE_TO_STOP_PACKAGE', 
                                              errorMessage: 'unable to stop package for restart,' + (isUndefined(rollbackError) ? 'rollback successful' : 'rollback failed'),
                                              rollbackError: errorToString(rollbackError) }, showJobsError);
                              });
                           }
                        });
                     });
                  } else {
                     job.succeeded({ operation: job.operation, state: 'package files installed' }, showJobsError);
                  }
               } else {
                  rollbackFiles(job, function(rollbackError) {
                     job.failed({ operation: job.operation, errorCode: 'ERR_DOWNLOAD_FAILED', downloadError: errorToString(downloadError),
                                  statusCode: downloadError.statusCode, rollbackError: errorToString(rollbackError) }, showJobsError);
                  });
               }
            });
         } else {
            job.failed({ operation: job.operation, errorCode: 'ERR_FILE_COPY_FAILED', backupError: errorToString(backupError) }, showJobsError);
         }
      });
   } else {
      job.failed({ operation: job.operation, errorCode: 'ERR_UNEXPECTED', errorMessage: 'job in unexpected state' }, showJobsError);
   }
}