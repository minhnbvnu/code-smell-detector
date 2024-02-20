function rsa (key, body) {
  return crypto.createSign("RSA-SHA1").update(body).sign(key, 'base64');
}