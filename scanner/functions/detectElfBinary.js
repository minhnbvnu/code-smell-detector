function detectElfBinary(binaryPath) {
  const MAGIC = 0x7f454c46; // 0x7f'E''L''F'

  return new Promise((resolve, reject) => {

    fs.open(binaryPath, 'r', (err, fd) => {
      if (err) { 
        reject(err);
        return;
      }

      function done(err, rs) {
        fs.close(fd, function (cerr) {
          if (err) {
            reject(err);
          } else {
            resolve(rs);
          }
        });
      }

      const ident = Buffer.alloc(16);
      fs.read(fd, ident, 0, 16, null, function (err, bytesRead) {
        if (err) { return done(err); }

        const magic = ident.readUInt32BE(0);

        if (MAGIC !== magic) { return done(null, false); }
        return done(null, true);
      });
    });
  });
}