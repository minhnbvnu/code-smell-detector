function isvalidPhone(phone) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(phone)
}