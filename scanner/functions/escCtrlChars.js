function escCtrlChars(str) {  // escape control chars which might cause problems handling ciphertext
  return str.replace(/[\0\t\v\f\r\xa0'"!-]/g, function(c) { return '!' + c.charCodeAt(0) + '!'; });
}