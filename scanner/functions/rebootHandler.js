function rebootHandler(job) {
   // Check if the reboot job has not yet been initiated
   if (job.status.status === 'QUEUED' || 
       isUndefined(job.status.statusDetails) || 
       isUndefined(job.status.statusDetails.step)) {

      // Change status to IN_PROGRESS
      job.inProgress({ operation: job.operation, step: 'initiated' }, function(err) { 
         showJobsError(err);

         var delay = (isUndefined(job.document.delay) ? '0' : job.document.delay.toString());

         // User account running node.js agent must have passwordless sudo access on /sbin/shutdown
         // Recommended online search for permissions setup instructions https://www.google.com/search?q=passwordless+sudo+access+instructions
         exec('sudo /sbin/shutdown -r +' + delay, function (err) { 
            if (!isUndefined(err)) {
               job.failed({ operation: job.operation, errorCode: 'ERR_SYSTEM_CALL_FAILED', errorMessage: 'unable to execute reboot, check passwordless sudo permissions on agent', 
                            error: errorToString(err) }, showJobsError);
            }
         });
      });

   // Check if the reboot operation has already been successfully initiated
   } else if (job.status.statusDetails.step === 'initiated') {
      job.succeeded({ operation: job.operation, step: 'rebooted' }, showJobsError);
   } else {
      job.failed({ operation: job.operation, errorCode: 'ERR_UNEXPECTED', errorMessage: 'reboot job execution in unexpected state' }, showJobsError);
   }   
}