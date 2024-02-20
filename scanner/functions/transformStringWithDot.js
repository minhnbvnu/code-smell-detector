function transformStringWithDot (str = '', isParse = true) {
  if (isParse) {
    return str.replace(/\./g, '^!^')
  } else {
    return str.replace(/\^!\^/g, '.')
  }
}