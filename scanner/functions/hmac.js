function hmac(key, string, encoding) {
  return crypto.createHmac('sha256', key).update(string, 'utf8').digest(encoding)
}