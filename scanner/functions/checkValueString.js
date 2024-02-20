function checkValueString(str) {
  if (!str || !str.length || Buffer.byteLength(str) > 255) {
    return false
  }

  const len = str.length
  const validCharacters = /[0-9a-zA-Z_ ./-]/
  for (let i = 0; i < len; ++i) {
    if (str.charCodeAt(i) < 128 && !validCharacters.test(str[i])) {
      return false
    }
  }
  return true
}