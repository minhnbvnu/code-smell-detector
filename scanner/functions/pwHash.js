function pwHash(pwValue) {
  var crypted;
  // tokens use AES
  if (this.type !== 'login_primary') {
    crypted = AESCrypt(pwValue);
  // or seeded crypt
  } else {
    crypted = strCryptSync(pwValue);
  }
  return crypted;
}