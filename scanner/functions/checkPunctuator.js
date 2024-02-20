function checkPunctuator(token, value) {
    return token.type === "(punctuator)" && token.value === value;
  }