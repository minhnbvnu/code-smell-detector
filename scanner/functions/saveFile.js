function saveFile(key, newFileSize, tempFilePath) {
  return new Promise((resolve, reject) => {
    wx.saveFile({
      tempFilePath: tempFilePath,
      success: (fileRes) => {
        const totalSize = savedFiles[KEY_TOTAL_SIZE] ? savedFiles[KEY_TOTAL_SIZE] : 0;
        savedFiles[key] = {};
        savedFiles[key][KEY_PATH] = fileRes.savedFilePath;
        savedFiles[key][KEY_TIME] = new Date().getTime();
        savedFiles[key][KEY_SIZE] = newFileSize;
        savedFiles['totalSize'] = newFileSize + totalSize;
        wx.setStorage({
          key: SAVED_FILES_KEY,
          data: savedFiles,
        });
        resolve(fileRes.savedFilePath);
      },
      fail: (error) => {
        console.error(`saveFile ${key} failed, then we delete all files, ${JSON.stringify(error)}`);
        // 由于 saveFile 成功后，res.tempFilePath 处的文件会被移除，所以在存储未成功时，我们还是继续使用临时文件
        resolve(tempFilePath);
        // 如果出现错误，就直接情况本地的所有文件，因为你不知道是不是因为哪次lru的某个文件未删除成功
        reset();
      },
    });
  });
}