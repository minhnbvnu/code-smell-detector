function getCiphers () {
  return Object.keys(desModes).concat(aes.getCiphers())
}