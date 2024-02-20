function downloadFromOSSAndExtractToNas(bucket, objectName, dst, context) {
  const nasZipPath = `/mnt/nas_dependencies/nas-${uuid.v4()}.zip`;

  return getOssClient(bucket, context).then(client => {
    return client.getStream(objectName);
  }).then(result => {
    if (!fs.existsSync(dst)) {
      fs.mkdirSync(dst, { recursive: true });
    }
    return new Promise((resolve, reject) => {

      result.stream.pipe(fs.createWriteStream(nasZipPath))
        .on('error', err => {
          reject(err);
        }).on('finish', resolve);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      exec(`unzip -q -n ${nasZipPath} -d ${dst} && rm ${nasZipPath} && ls -al ${dst}`, {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 1024 * 1024 * 1024,
        killSignal: 'SIGTERM'
      }, (error, stdout, stderr) => {
        if (error) { reject(error); }
        resolve({
          stdout,
          stderr
        });
      });
    });
  });
}