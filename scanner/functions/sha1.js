function sha1 (buf) {
  return crypto.createHash('sha1').update(buf).digest()
}