function getMD5(blob, cbProgress) {
  return new Promise((resolve, reject) => {
    var md5 = CryptoJS.algo.MD5.create();
    readChunked(blob, (chunk, offs, total) => {
      md5.update(CryptoJS.enc.Latin1.parse(chunk));
      if (cbProgress) {
        cbProgress(offs / total);
      }
    }, err => {
      if (err) {
        reject(err);
      } else {
        // TODO: Handle errors
        var hash = md5.finalize();
        var hashHex = hash.toString(CryptoJS.enc.Hex);
        resolve(hashHex);
      }
    });
  });
}