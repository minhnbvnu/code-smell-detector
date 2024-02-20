function hasGzipId12(gzipped, cb) {
  const stream = fs.createReadStream(gzipped, { start: 0, end: 1 });
  let buffer = Buffer.from('');
  let hasBeenCalled = false;

  stream.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk], 2);
  });

  stream.on('error', (err) => {
    if (hasBeenCalled) {
      throw err;
    }

    hasBeenCalled = true;
    cb(err);
  });

  stream.on('close', () => {
    if (hasBeenCalled) {
      return;
    }

    hasBeenCalled = true;
    cb(null, buffer[0] === 31 && buffer[1] === 139);
  });
}