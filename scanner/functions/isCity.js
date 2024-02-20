function isCity (key) {
  if (!(Number(key) % 100)) {
    return true
  }
  // 后四位数处理
  if (Number(key.substring(2)) > 9000) {
    return true
  }
  return false
}