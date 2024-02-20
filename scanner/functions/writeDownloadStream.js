async function writeDownloadStream(stream, to, etagPath = `${to}.etag`) {
    const writeEtagPromise = new Promise((resolve, reject) => {
      stream.once('response', async (response) => {
        try {
          await writeFile(etagPath, response.headers.etag);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    const writeFilePromise = new Promise((resolve, reject) => {
      const writeStream = createWriteStream(to).once('error', (err) => reject(logError('writeDownloadStream', err)));
      stream.pipe(writeStream);

      writeStream.once('finish', resolve);
    });

    return Promise.all([writeEtagPromise, writeFilePromise]);
  }