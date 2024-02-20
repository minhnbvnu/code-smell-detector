function verifyHex32(str) {
  if (!str || !/^[0-9a-f]{64}$/i.test(str)) throw new Error('Invalid blinding data (invalid hex)')
  return str
}