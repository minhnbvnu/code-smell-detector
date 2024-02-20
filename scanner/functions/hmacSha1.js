function hmacSha1 (options) {
  return crypto.createHmac('sha1', options.secret).update(options.message).digest('base64')
}