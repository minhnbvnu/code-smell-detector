function parseQuotedFontFamily(input, quote) {
  var index = 0;

  while (index < input.length) {
    var current = input.charAt(index);

    if (current === quote) {
      return [input.substring(0, index), input.substring(index + 1)];
    }

    index += 1;
  }

  // Unexpected end of input
  return null;
}