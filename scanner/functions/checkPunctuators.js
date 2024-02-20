function checkPunctuators(token, values) {
    if (token.type === "(punctuator)") {
      return _.contains(values, token.value);
    }
    return false;
  }