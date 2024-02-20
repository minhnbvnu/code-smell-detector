function startPackage(package, cb) {
   if (isUndefined(packageRuntimes[package.packageName])) {
      packageRuntimes[package.packageName] = {};
   }

   var packageRuntime = packageRuntimes[package.packageName];

   if (!isUndefined(packageRuntime.process)) {
      cb(new Error('package already running'));
      return;
   }

   packageRuntime.startupTimer = setTimeout(function() { 
      packageRuntime.startupTimer = null;
      cb();
   }, startupTimout * 1000);

   packageRuntime.process = exec(package.launchCommand, { cwd: (!isUndefined(package.workingDirectory) ? path.resolve(package.workingDirectory) : undefined) }, function(err) {
      packageRuntime.process = null;
      if (!isUndefined(packageRuntime.startupTimer)) {
         clearTimeout(packageRuntime.startupTimer);
         packageRuntime.startupTimer = null;
         cb(err);
      } else if (!isUndefined(packageRuntime.killTimer)) {
         clearTimeout(packageRuntime.killTimer);
         packageRuntime.killTimer = null;
         packageRuntime.killedCallback();
         packageRuntime.killedCallback = null;
      }
   });
}