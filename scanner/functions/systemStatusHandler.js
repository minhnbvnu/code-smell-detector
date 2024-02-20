function systemStatusHandler(job) {
   var packageNames = '[';

   for (var i = 0; i < installedPackages.length; i++) {
      packageNames += installedPackages[i].packageName + ((i !== installedPackages.length - 1) ? ', ' : '');
   }
   packageNames += ']';

   job.succeeded({
      operation: job.operation,
      installedPackages: packageNames,
      arch: process.arch,
      nodeVersion: process.version,
      cwd: process.cwd(),
      platform: process.platform,
      title: process.title,
      uptime: process.uptime()
   }, showJobsError);
}