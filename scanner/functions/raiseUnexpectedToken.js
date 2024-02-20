function raiseUnexpectedToken(type, token) {
    raise(token, errors.expectedToken, type, token.value);
  }