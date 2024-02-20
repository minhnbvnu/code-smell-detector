function doLru(size) {
  return new Promise((resolve, reject) => {
    let totalSize = savedFiles[KEY_TOTAL_SIZE] ? savedFiles[KEY_TOTAL_SIZE] : 0;

    if (size + totalSize <= MAX_SPACE_IN_B) {
      resolve();
      return;
    }
    // 如果加上新文件后大小超过最大限制，则进行 lru
    const pathsShouldDelete = [];
    // 按照最后一次的访问时间，从小到大排序
    const allFiles = JSON.parse(JSON.stringify(savedFiles));
    delete allFiles[KEY_TOTAL_SIZE];
    const sortedKeys = Object.keys(allFiles).sort((a, b) => {
      return allFiles[a][KEY_TIME] - allFiles[b][KEY_TIME];
    });

    for (const sortedKey of sortedKeys) {
      totalSize -= savedFiles[sortedKey].size;
      pathsShouldDelete.push(savedFiles[sortedKey][KEY_PATH]);
      delete savedFiles[sortedKey];
      if (totalSize + size < MAX_SPACE_IN_B) {
        break;
      }
    }

    savedFiles['totalSize'] = totalSize;

    wx.setStorage({
      key: SAVED_FILES_KEY,
      data: savedFiles,
      success: () => {
      // 保证 storage 中不会存在不存在的文件数据
        if (pathsShouldDelete.length > 0) {
          removeFiles(pathsShouldDelete);
        }
        resolve();
      },
      fail: (error) => {
        console.error(`doLru setStorage failed, ${JSON.stringify(error)}`);
        reject();
      },
    });
  });
}