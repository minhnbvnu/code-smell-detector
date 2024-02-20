function downloadFiles(job, iFile, cb) {
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

   if (isUndefined(file.fileSource) || isUndefined(file.fileSource.url)) {
      job.inProgress({ operation: job.operation, step: 'download error, rollback pending', fileName: file.fileName }, function(err) {
         showJobsError(err);
         cb(new Error('fileSource url missing'));
      });
      return;
   }

   job.inProgress({ step: 'downloading', fileName: file.fileName }, function(err) {
      showJobsError(err);
      downloadFile(file.fileSource.url, filePath, function(downloadError) {
         if (isUndefined(downloadError)) {
            validateChecksum(filePath, file.checksum, function(checksumError) {
               if (isUndefined(checksumError)) {
                  downloadFiles(job, iFile + 1, cb);
               } else {
                  cb(checksumError);
               }
            });
         } else {
            cb(downloadError);
         }
      });
   });
}