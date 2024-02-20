function createDecipher (suite, password) {
  suite = suite.toLowerCase()

  var keyLen, ivLen
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }

  var keys = ebtk(password, false, keyLen, ivLen)
  return createDecipheriv(suite, keys.key, keys.iv)
}