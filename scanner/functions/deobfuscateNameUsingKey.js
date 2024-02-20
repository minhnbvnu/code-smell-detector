function deobfuscateNameUsingKey(name, key) {
  const bytes = Buffer.from(name, 'base64')
  const keyBytes = Buffer.from(key)

  return encode(bytes, keyBytes).toString('utf-8')
}