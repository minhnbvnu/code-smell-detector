function stopPackage(packageName, cb) {
   var packageRuntime = packageRuntimes[packageName];

   if (isUndefined(packageRuntime) || isUndefined(packageRuntime.process)) {
      cb();
      return;
   }

   if (!isUndefined(packageRuntime.killTimer)) {
      cb(new Error('already attempting to stop package ' + packageName));
      return;
   }

   if (!isUndefined(packageRuntime.startupTimer)) {
      clearTimeout(packageRuntime.startupTimer);
      packageRuntime.startupTimer = null;
   }

   packageRuntime.killedCallback = cb;
   packageRuntime.killTimer = setTimeout(function() {
      packageRuntime.killedCallback = null; 
      packageRuntime.killTimer = null;
      cb(new Error('unable to stop package ' + packageName));
   }, killTimout * 1000);

   packageRuntime.process.kill();
}