function AESDecrypt(cryptedStr, autoPadding) {
  var crypted = new Buffer(cryptedStr, 'base64').toString('utf-8');
  var keyVersion = crypted.substr(0, 1),
  iv = crypted.substr(1, 16),
  key = CFG.k[keyVersion],
  cypher = crypted.substr(17);

  var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  if (!autoPadding) {
    autoPadding = false;
  }
  decipher.setAutoPadding(autoPadding);

  var decrypted = (decipher.update(cypher, 'base64', 'ascii') + decipher.final('ascii'));
  return decrypted;
}