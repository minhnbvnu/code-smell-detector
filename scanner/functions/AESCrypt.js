function AESCrypt(value) {
  var key, keyVersion,
  iv = crypto.randomBytes(32).toString('hex').substr(0, 16);
  // get latest key
  for (keyVersion in CFG.k) {
    key = CFG.k[keyVersion];
  }

  var cipher = crypto.createCipheriv('aes-256-cbc', key, iv),
  crypted = cipher.update(value, 'ascii', 'base64') + cipher.final('base64');
  cryptEncoded = new Buffer(keyVersion + iv + crypted).toString('base64');

  return cryptEncoded;
}