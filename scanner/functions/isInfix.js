function isInfix(token) {
    return token.infix || (!token.identifier && !token.template && !!token.led);
  }