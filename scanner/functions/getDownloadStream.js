async function getDownloadStream(downloadUrl) {
    let prevTransferred = 0;
    const downloadStream = got.stream(downloadUrl, requestOpts);
    return await new Promise((resolve, reject) => {
      downloadStream
        .once('response', () => {
          downloadStream.on('downloadProgress', ({ transferred, total }) => {
            const active = isDownloadActive();
            if (active) {
              downloadStreams.set(downloadStream, true);
            }
            if (downloadStreams.get(downloadStream)) {
              opts.progressCb(total, transferred, transferred - prevTransferred, downloadUrl, active);
            }
            prevTransferred = transferred;
          });
        })
        .once('finish', () => {
          resolve(downloadStream);
        })
        .once('end', () => {
          downloadStreams.delete(downloadStream);
        })
        .once('error', (err) => {
          if (err.code === 'ERR_NON_2XX_3XX_RESPONSE' && downloadUrl.includes('edge')) {
            reject(
              logError(
                'getDownloadStream',
                err,
                'It may be due to the specified edge driver version ' +
                  downloadUrl.split('/')[3] +
                  ' is unavailable for current platform. Try downloading a different version of edge driver '
              )
            );
          } else {
            reject(logError('getDownloadStream', err, 'Could not download ' + downloadUrl));
          }
          throw new Error('Could not download ' + downloadUrl);
        });
    });
  }