function calculatePayloadHash (payload, algorithm, contentType) {
  var hash = crypto.createHash(algorithm)
  hash.update('hawk.1.payload\n')
  hash.update((contentType ? contentType.split(';')[0].trim().toLowerCase() : '') + '\n')
  hash.update(payload || '')
  hash.update('\n')
  return hash.digest('base64')
}