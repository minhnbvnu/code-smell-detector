function readEscapeSequence() {
    var sequenceStart = index;
    switch (input.charAt(index)) {
      case 'n': index++; return '\n';
      case 'r': index++; return '\r';
      case 't': index++; return '\t';
      case 'v': index++; return '\x0B';
      case 'b': index++; return '\b';
      case 'f': index++; return '\f';
      case 'z': index++; skipWhiteSpace(); return '';
      case 'x':
        if (isHexDigit(input.charCodeAt(index + 1)) &&
            isHexDigit(input.charCodeAt(index + 2))) {
          index += 3;
          return '\\' + input.slice(sequenceStart, index);
        }
        return '\\' + input.charAt(index++);
      default:
        if (isDecDigit(input.charCodeAt(index))) {
          while (isDecDigit(input.charCodeAt(++index)));
          return '\\' + input.slice(sequenceStart, index);
        }
        return input.charAt(index++);
    }
  }