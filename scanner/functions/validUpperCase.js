function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}