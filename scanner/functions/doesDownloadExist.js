async function doesDownloadExist(url) {
  const downloadStream = got.stream(url, { timeout: 15000, retry: 0 });
  return new Promise((resolve, reject) => {
    downloadStream
      .once('response', () => resolve())
      .once('downloadProgress', () => {
        downloadStream.destroy();
      })
      .once('error', (err) => {
        console.error(err);
        reject(new Error('Error requesting ' + url + ' - ' + err.message));
      });
  });
}