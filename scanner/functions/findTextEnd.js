function findTextEnd(str, index) {
  while (true) {
    const textEnd = str.indexOf('<', index)
    if (textEnd === -1) {
      return textEnd
    }
    const char = str.charAt(textEnd + 1)
    if (char === '/' || char === '!' || alphanumeric.test(char)) {
      return textEnd
    }
    index = textEnd + 1
  }
}