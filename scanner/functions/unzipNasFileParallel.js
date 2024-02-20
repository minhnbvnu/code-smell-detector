function unzipNasFileParallel(nasHttpTriggerPath, dstDir, nasZipFile, filesArrQueue, unzipFilesCount, noClobber) {
  return new Promise((resolve, reject) => {
    const bar = createProgressBar(`${green(':unzipping')} :bar :current/:total :rate files/s, :percent :elapsed s`, { total: unzipFilesCount });
    let unzipQueue = async.queue(async (unzipFiles, next) => {
      try {
        await sendUnzipRequest(nasHttpTriggerPath, dstDir, nasZipFile, unzipFiles, noClobber);
        bar.tick(unzipFiles.length);
      } catch (error) {
        // zip 中存在特殊文件名，例如 $data.js
        if (error.message && error.message.includes('filename not matched')) {
          console.log(red(error));
          return;
        }
        if (error.message && error.message.toLowerCase().includes('permission denied')) {
          //TODO : 权限问题更加详细的提示
          console.log(red(error));
          return;
        }
        // 当解压文件数大于 1 ，默认为解压文件数过多导致 unzip 指令超出指令长度限制导致的解压失败
        // 会将解压文件列表折半拆分后进行重试
        if (unzipFiles.length > 1) {
          console.log('Retry unziping...');
          let retryUnzipFiles = [];
          retryUnzipFiles.push(unzipFiles.slice(0, unzipFiles.length / 2));
          retryUnzipFiles.push(unzipFiles.slice(unzipFiles.length / 2, unzipFiles.length));
          unzipQueue.unshift(retryUnzipFiles);
        } else {
          // 解压文件数小于 1 个时，认为不是解压文件数过多造成的问题
          // 因此提示用户重新 sync
          console.log(red(error));
          console.log(red('Unzip error! Please re-sync.'));
          return;
        }
      }
      next();
    }, constants.FUN_NAS_UPLOAD_PARALLEL_COUNT);

    unzipQueue.drain = () => {
      console.log(`${green('✔')} unzip done`);
      resolve();
    };
    unzipQueue.push(filesArrQueue);
  });
}