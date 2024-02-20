function jobsAgent(args) {
   //
   // The jobs module exports an MQTT instance, which will attempt
   // to connect to the AWS IoT endpoint configured in the arguments.
   // Once connected, it will emit events which our package can
   // handle.
   //
   const jobs = jobsModule({
      keyPath: args.privateKey,
      certPath: args.clientCert,
      caPath: args.caCert,
      clientId: args.clientId,
      region: args.region,
      baseReconnectTimeMs: args.baseReconnectTimeMs,
      keepalive: args.keepAlive,
      protocol: args.Protocol,
      port: args.Port,
      host: args.Host,
      thingName: args.thingName,
      debug: args.Debug
   });

   jobs
      .on('connect', function() {
         console.log('agent connected');
      });
   jobs
      .on('close', function() {
         console.log('agent connection closed');
      });
   jobs
      .on('reconnect', function() {
         console.log('agent reconnected');
      });
   jobs
      .on('offline', function() {
         console.log('agent connection offline');
      });
   jobs
      .on('error', function(error) {
         console.log('agent connection error', error);
      });
   jobs
      .on('message', function(topic, payload) {
         console.log('agent message received', topic, payload.toString());
      });

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

   subscribeToJobsWithRetryOnError(args.thingName, 'shutdown', shutdownHandler);
   subscribeToJobsWithRetryOnError(args.thingName, 'reboot', rebootHandler);
   subscribeToJobsWithRetryOnError(args.thingName, 'install', installHandler);
   subscribeToJobsWithRetryOnError(args.thingName, 'systemStatus', systemStatusHandler);
   subscribeToJobsWithRetryOnError(args.thingName, 'stop', stopPackageFromJob);
   subscribeToJobsWithRetryOnError(args.thingName, 'start', startPackageFromJob);   
   subscribeToJobsWithRetryOnError(args.thingName, 'restart', restartPackage);   

   jobs.startJobNotifications(args.thingName, function(err) {
      if (isUndefined(err)) {
         console.log('startJobNotifications completed for thing: ' + args.thingName);
      }
      else {
         console.error(err);
      }
   });

   try {
      installedPackages = JSON.parse(fs.readFileSync(installedPackagesDataFileName, 'utf8'));
      if (!(installedPackages instanceof Array)) {
         throw new Error('invalid file:' + installedPackagesDataFileName);
      }
   } catch (err) {
      // unable to read installedPackages file, initializing to empty array
      installedPackages = [];
   }

   for (var i = 0; i < installedPackages.length; i++) {
      if (!isUndefined(installedPackages[i].launchCommand) && 
          (isUndefined(installedPackages[i].autoStart) || installedPackages[i].autoStart)) {
         startPackage(installedPackages[i], console.error);
      }
   }
}