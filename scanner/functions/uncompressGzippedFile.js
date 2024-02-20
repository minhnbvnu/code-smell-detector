async function uncompressGzippedFile(from, gzipFilePath) {
  return new Promise((resolve, reject) => {
    const gunzip = zlib.createGunzip();
    const extractPath = path.join(path.dirname(gzipFilePath), path.basename(gzipFilePath, '.gz'));
    const writeStream = fs
      .createWriteStream(extractPath)
      .once('error', (err) => reject(logError('uncompressGzippedFile:createWriteStream', err)));
    const gunzippedContent = fs.createReadStream(gzipFilePath).pipe(gunzip).once('error', reject);

    if (from.substr(-7) === '.tar.gz') {
      const extractor = tarStream.extract();
      let fileAlreadyUnarchived = false;
      let cbCalled = false;

      extractor
        .on('entry', (header, stream, callback) => {
          if (fileAlreadyUnarchived) {
            if (!cbCalled) {
              cbCalled = true;
              return reject(new Error('Tar archive contains more than one file'));
            }
            fileAlreadyUnarchived = true;
          }
          stream.pipe(writeStream);
          stream.on('end', () => {
            callback();
          });
          stream.resume();
        })
        .on('finish', () => {
          if (!cbCalled) {
            cbCalled = true;
            resolve();
          }
        });
      gunzippedContent.pipe(extractor);
    } else {
      gunzippedContent.pipe(writeStream).on('finish', resolve);
    }
  });
}