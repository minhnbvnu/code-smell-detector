function hexEscape() {
    var buffer = '';
    var c = peek();

    if (!util.isHexDigit(c)) {
      throw invalidChar(read());
    }

    buffer += read();
    c = peek();

    if (!util.isHexDigit(c)) {
      throw invalidChar(read());
    }

    buffer += read();
    return String.fromCodePoint(parseInt(buffer, 16));
  }