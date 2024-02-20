function validatePassword (hash, maybePw) {
  if (!Buffer.isBuffer(hash) || !maybePw) return false
  return generatePwHash(maybePw).compare(hash) === 0
}