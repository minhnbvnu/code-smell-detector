function readZipFile(zipPath, filePath) {
  return new Promise((resolve, reject) => {
    lsArchive.readFile(zipPath, filePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}