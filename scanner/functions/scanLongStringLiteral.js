function scanLongStringLiteral() {
    var string = readLongString();
    if (false === string) raise(token, errors.expected, '[', token.value);

    return {
        type: StringLiteral
      , value: string
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }