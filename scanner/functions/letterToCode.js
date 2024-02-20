function letterToCode(str) {
  const letterPos = parseInt(str[0], 36)
  return parseInt(letterPos.toString() + str.substring(1))
}