function validateChecksum(fileName, checksum, cb) {
   if (isUndefined(checksum) || isUndefined(checksum.hashAlgorithm)) {
      cb();
      return;
   }

   if (isUndefined(checksum.inline) || isUndefined(checksum.inline.value)) {
      cb(new Error('Installed jobs agent only supports inline checksum value provided in job document'));
      return;
   }

   var hash;
   try {
      hash = crypto.createHash(checksum.hashAlgorithm);
   } catch (err) {
      cb(new Error('Unsupported checksum hash algorithm: ' + checksum.hashAlgorithm));
      return;
   }

   var stream = fs.createReadStream(fileName);

   stream.on('data', function (data) {
      hash.update(data, 'utf8');
   }).on('end', function () {
      if (hash.digest('hex') !== checksum.inline.value) {
         var err = new Error('Checksum mismatch');
         err.fileName = fileName;
         cb(err);
      } else {
         cb();
      }
   }).on('error', function (err) {
      err.fileName = fileName;
      cb(err);
   });
}