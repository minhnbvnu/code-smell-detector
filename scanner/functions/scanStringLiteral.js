function scanStringLiteral() {
    var delimiter = input.charCodeAt(index++)
      , stringStart = index
      , string = ''
      , charCode;

    while (index < length) {
      charCode = input.charCodeAt(index++);
      if (delimiter === charCode) break;
      if (92 === charCode) { // \
        string += input.slice(stringStart, index - 1) + readEscapeSequence();
        stringStart = index;
      }
      else if (index >= length || isLineTerminator(charCode)) {
        string += input.slice(stringStart, index - 1);
        raise({}, errors.unfinishedString, string + String.fromCharCode(charCode));
      }
    }
    string += input.slice(stringStart, index - 1);

    return {
        type: StringLiteral
      , value: string
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }