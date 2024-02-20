function readHexLiteral() {
    var fraction = 0 // defaults to 0 as it gets summed
      , binaryExponent = 1 // defaults to 1 as it gets multiplied
      , binarySign = 1 // positive
      , digit, fractionStart, exponentStart, digitStart;

    digitStart = index += 2; // Skip 0x part
    if (!isHexDigit(input.charCodeAt(index)))
      raise({}, errors.malformedNumber, input.slice(tokenStart, index));

    while (isHexDigit(input.charCodeAt(index))) index++;
    digit = parseInt(input.slice(digitStart, index), 16);
    if ('.' === input.charAt(index)) {
      fractionStart = ++index;

      while (isHexDigit(input.charCodeAt(index))) index++;
      fraction = input.slice(fractionStart, index);
      fraction = (fractionStart === index) ? 0
        : parseInt(fraction, 16) / Math.pow(16, index - fractionStart);
    }
    if ('pP'.indexOf(input.charAt(index) || null) >= 0) {
      index++;
      if ('+-'.indexOf(input.charAt(index) || null) >= 0)
        binarySign = ('+' === input.charAt(index++)) ? 1 : -1;

      exponentStart = index;
      if (!isDecDigit(input.charCodeAt(index)))
        raise({}, errors.malformedNumber, input.slice(tokenStart, index));

      while (isDecDigit(input.charCodeAt(index))) index++;
      binaryExponent = input.slice(exponentStart, index);
      binaryExponent = Math.pow(2, binaryExponent * binarySign);
    }

    return (digit + fraction) * binaryExponent;
  }