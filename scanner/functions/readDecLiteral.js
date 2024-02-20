function readDecLiteral() {
    while (isDecDigit(input.charCodeAt(index))) index++;
    if ('.' === input.charAt(index)) {
      index++;
      while (isDecDigit(input.charCodeAt(index))) index++;
    }
    if ('eE'.indexOf(input.charAt(index) || null) >= 0) {
      index++;
      if ('+-'.indexOf(input.charAt(index) || null) >= 0) index++;
      if (!isDecDigit(input.charCodeAt(index)))
        raise({}, errors.malformedNumber, input.slice(tokenStart, index));

      while (isDecDigit(input.charCodeAt(index))) index++;
    }

    return parseFloat(input.slice(tokenStart, index));
  }