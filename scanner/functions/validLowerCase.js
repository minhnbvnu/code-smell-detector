function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}