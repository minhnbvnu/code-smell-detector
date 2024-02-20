function newSyntaxError(message) {
    return new SyntaxError(message + ', got "' + chop(token, 30) + '" (char ' + index + ')');
  }