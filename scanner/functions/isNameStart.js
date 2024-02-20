function isNameStart(code) {
    return isLetter(code) || isNonAscii(code) || code === 95;
  }