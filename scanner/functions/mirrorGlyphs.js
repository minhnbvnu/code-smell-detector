function mirrorGlyphs(c) {
    /*
     # BidiMirroring-1.txt
     0028; 0029 # LEFT PARENTHESIS
     0029; 0028 # RIGHT PARENTHESIS
     003C; 003E # LESS-THAN SIGN
     003E; 003C # GREATER-THAN SIGN
     005B; 005D # LEFT SQUARE BRACKET
     005D; 005B # RIGHT SQUARE BRACKET
     007B; 007D # LEFT CURLY BRACKET
     007D; 007B # RIGHT CURLY BRACKET
     00AB; 00BB # LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
     00BB; 00AB # RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
     */
    switch (c) {
      case '(':
        return ')';
      case ')':
        return '(';
      case '<':
        return '>';
      case '>':
        return '<';
      case ']':
        return '[';
      case '[':
        return ']';
      case '}':
        return '{';
      case '{':
        return '}';
      case '\u00AB':
        return '\u00BB';
      case '\u00BB':
        return '\u00AB';
      default:
        return c;
    }
  }