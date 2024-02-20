function isChn(str) {
  return /[\u4E00-\u9FA5]/.test(str)
}