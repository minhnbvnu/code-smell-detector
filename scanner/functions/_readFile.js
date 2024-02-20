function _readFile(loc, encoding) {
  return new Promise((resolve, reject) => {
    (_fs || _load_fs()).default.readFile(loc, encoding, function (err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}