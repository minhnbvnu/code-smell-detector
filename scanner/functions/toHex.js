function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}