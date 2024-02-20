function generatePwHash (pw) {
  var iterations = 5000
  return crypto.pbkdf2Sync(pw, randomBytes, iterations, BYTES_PER_HASH, 'sha256')
}