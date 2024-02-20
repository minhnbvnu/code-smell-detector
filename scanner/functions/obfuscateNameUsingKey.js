function obfuscateNameUsingKey(name, key) {
  const encodedBytes = Buffer.from(name, 'utf-8')
  const keyBytes = Buffer.from(key)
  return encode(encodedBytes, keyBytes).toString('base64')
}