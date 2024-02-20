function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}