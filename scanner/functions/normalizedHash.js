function normalizedHash(value) {
  // We leverage the last 15 hex digits which will fit in a signed long
  return parseInt(crypto.createHash('sha1').update(value).digest('hex').slice(-15), 16)
}