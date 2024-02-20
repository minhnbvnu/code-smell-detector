function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c)
      // byte-order-mark
      && c !== 0xFEFF
      // b-char
      && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }