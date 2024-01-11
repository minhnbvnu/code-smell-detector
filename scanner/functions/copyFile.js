async function copyFile(source, destination, mode) {
  return new Promise((resolve, reject) => {
    mkdirp(Path.dirname(destination), error => {
      if (error) return reject(error);
      const readStream = fs.createReadStream(source);
      readStream.on('error', reject).once('open', () => {
        const writeStream = fs.createWriteStream(destination, { mode });
        writeStream
          .on('error', reject)
          .on('open', () => readStream.pipe(writeStream))
          .once('close', () => resolve());
      });
    });
  });
}