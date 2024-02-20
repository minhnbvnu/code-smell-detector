function shutdownHandler(job) {
   // Change status to IN_PROGRESS
   job.inProgress({ operation: job.operation, step: 'attempting' }, function(err) { 
      showJobsError(err);

      var delay = (isUndefined(job.document.delay) ? '0' : job.document.delay.toString());

      // Check for adequate permissions to perform shutdown, use -k option to do dry run
      //
      // User account running node.js agent must have passwordless sudo access on /sbin/shutdown
      // Recommended online search for permissions setup instructions https://www.google.com/search?q=passwordless+sudo+access+instructions
      exec('sudo /sbin/shutdown -k +' + delay, function (err) { 
         if (!isUndefined(err)) {
            job.failed({ operation: job.operation, errorCode: 'ERR_SYSTEM_CALL_FAILED', errorMessage: 'unable to execute shutdown, check passwordless sudo permissions on agent', 
                         error: errorToString(err) }, showJobsError);
         } else {
            job.succeeded({ operation: job.operation, step: 'initiated' }, function (err) {
               showJobsError(err);
               exec('sudo /sbin/shutdown +' + delay);
            });
         }
      });
   });
}