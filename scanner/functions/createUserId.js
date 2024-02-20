function createUserId(cb) {

  function createUUID() {
    return cb(require('node-uuid').v4());
  }

  try {
    return require('getmac').getMac(function (err, macAddress) {
      if (err) {
        createUUID();
      } else {
        cb(crypto.createHash('sha1').update(macAddress, 'utf8').digest('hex'));
      }
    });
  } catch (e) {
    createUUID();
  }
}