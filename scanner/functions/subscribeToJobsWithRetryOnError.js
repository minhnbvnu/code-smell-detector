function subscribeToJobsWithRetryOnError(thingName, operationName, handler, backoff) {
      jobs.subscribeToJobs(thingName, operationName, function(err, job) {
         if (isUndefined(err)) {
            if ((!isUndefined(args.Debug)) && (args.Debug === true)) {
               console.log('job execution handler invoked:', { thingName: thingName, operationName: operationName });
            }
            handler(job);
            backoff = 1;   // reset backoff upon successful job receipt
         } else {
            // on error attempt to resubscribe with increasing backoff
            if (isUndefined(backoff)) {
               backoff = 1;
            }
            setTimeout(function() {
               subscribeToJobsWithRetryOnError(thingName, operationName, handler, Math.min(backoff * 2, maxBackoff));
            }, backoff * 1000);
         }
      });
   }