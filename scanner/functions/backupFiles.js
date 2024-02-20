function backupFiles(job, iFile, cb) {
   if (isUndefined(cb)) {
      cb = iFile;
      iFile = 0;
   }

   if (iFile === job.document.files.length) {
      cb();
      return;
   } 

   var file = job.document.files[iFile];
   if (isUndefined(file)) {
      cb(new Error('empty file specification'));
      return;
   }

   if (isUndefined(file.fileName)) {
      cb(new Error('fileName missing'));
      return;
   }

   var filePath = path.resolve(job.document.workingDirectory || '', file.fileName);
   if (!fs.existsSync(filePath)) {
      backupFiles(job, iFile + 1, cb);
      return;
   }

   job.inProgress({ operation: job.operation, step: 'backing up existing file', fileName: file.fileName }, function(err) {
      showJobsError(err);
      copyFile(filePath, filePath + '.old', function(copyFileError) {
         if (isUndefined(copyFileError)) {
            backupFiles(job, iFile + 1, cb);
         } else {
            cb(copyFileError);
         }
      });
   });
}