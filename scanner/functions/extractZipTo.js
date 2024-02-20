function extractZipTo(zipPath, dest) {
  return new Promise((resolve, reject) => {
    // use extract-zip instead of unzipper  https://github.com/alibaba/funcraft/issues/756
    extract(zipPath, { dir: dest }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}