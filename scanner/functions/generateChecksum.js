function generateChecksum (content) {
  let hash1 = md5(content + MD5_SALT)
  return md5(MD5_SALT + hash1)
}