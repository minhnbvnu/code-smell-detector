async function uncompressDownloadedFile(zipFilePath) {
  debug('unzip ' + zipFilePath);

  return new Promise((resolve, reject) =>
    yauzl.open(zipFilePath, function onOpenZipFile(err, zipFile) {
      if (err) {
        return reject(logError('uncompressDownloadedFile:yauzl.open', err));
      }
      zipFile.on('entry', (entry) => {
        if (fs.existsSync(entry.fileName) && fs.lstatSync(entry.fileName).isDirectory()) {
          return; // ignore folders, i.e. release notes folder in edge driver zip
        }
        zipFile.openReadStream(entry, { autoClose: true }, function onOpenZipFileEntryReadStream(errRead, readStream) {
          if (errRead) {
            return reject(logError('uncompressDownloadedFile:zipFile.openReadStream', err));
          }
          const extractPath = path.join(
            path.dirname(zipFilePath),
            isBrowserDriver(entry.fileName)
              ? path.basename(zipFilePath, '.zip') + `${process.platform === 'win32' ? '.exe' : ''}`
              : path.basename(entry.fileName)
          );
          const extractWriteStream = fs
            .createWriteStream(extractPath)
            .once('error', (errWs) => reject(logError('uncompressDownloadedFile:readStream.pipe', errWs)));
          readStream
            .pipe(extractWriteStream)
            .once('error', (errPipe) => reject(logError('uncompressDownloadedFile:readStream.pipe', errPipe)));
        });
      });
      zipFile.on('close', resolve);
    })
  );
}