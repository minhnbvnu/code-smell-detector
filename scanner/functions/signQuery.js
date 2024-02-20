function signQuery (options) {
  options.message = queryStringToSign(options)
  return hmacSha1(options)
}