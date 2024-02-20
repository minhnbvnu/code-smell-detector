function uploadFileByChunk(nasHttpTriggerPath, nasZipFile, zipFilePath, fileOffSet) {
  return new Promise((resolve, reject) => {
    let chunks = fileOffSet.length;
    const bar = createProgressBar(`${green(':uploading')} :bar :current/:total :rate files/s, :percent :elapsed s`, { total: chunks });
    let uploadQueue = async.queue(async(offSet, callback) => {
      try {
        await uploadChunkFile(nasHttpTriggerPath, nasZipFile, zipFilePath, offSet);
      } catch (error) {
        console.log(red(`upload error : ${error.message}`));
        return;
      // TO DO：RETRY
      }
      bar.tick();
      callback();
    }, constants.FUN_NAS_UPLOAD_PARALLEL_COUNT);
    uploadQueue.drain = () => {
      console.log(`${green('✔')} upload done`);
      resolve();
    };

    uploadQueue.push(fileOffSet);
  });
}