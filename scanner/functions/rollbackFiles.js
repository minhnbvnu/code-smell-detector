function rollbackFiles(job, iFile, cb) {
   if (isUndefined(cb)) {
      cb = iFile;
      iFile = 0;
   }

   if (iFile === job.document.files.length) {
      cb();
      return;
   } 

   var file = job.document.files[iFile];
   var filePath = path.resolve(job.document.workingDirectory || '', file.fileName);
   if (!fs.existsSync(filePath + '.old')) {
      rollbackFiles(job, iFile + 1, cb);
      return;
   }

   job.inProgress({ operation: job.operation, step: 'rolling back file', fileName: file.fileName }, function(err) {
      showJobsError(err);
      copyFile(filePath + '.old', filePath, function(fileErr) {
         rollbackFiles(job, iFile + 1, function(rollbackError) {
            cb(rollbackError || fileErr);
         });
      });
   });
}