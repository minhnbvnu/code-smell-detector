function isDistCode(str) {
  if (isEmpty(str)) return false
  if (isChn(str)) return false
  if (str.toString().length != DISTCODE_LENGTH) return false
  if (isNaN(parseInt(str))) return false
  return true
}