function removeFiles(pathsShouldDelete) {
  for (const pathDel of pathsShouldDelete) {
    let delPath = pathDel;
    if (typeof pathDel === 'object') {
      delPath = pathDel.filePath;
    }
    wx.removeSavedFile({
      filePath: delPath,
      fail: (error) => {
        console.error(`removeSavedFile ${pathDel} failed, ${JSON.stringify(error)}`);
      },
    });
  }
}