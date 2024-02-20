function toBase64 (str) {
  return Buffer.from(str || '', 'utf8').toString('base64')
}