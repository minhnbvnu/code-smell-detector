function parseFormat(string = '0') {
  const regex = /([\+\-])?([0-9\,]+)?([\.0-9]+)?([a\s]+)?/
  const matches = string ? string.match(regex) : ['', '', '', '', '']
  const float = matches[3]
  const decimals = float ? float.match(/0/g).length : 0

  return {
    sign: matches[1] || '',
    base: matches[2] || '',
    decimals,
    unit: matches[4] || ''
  }
}