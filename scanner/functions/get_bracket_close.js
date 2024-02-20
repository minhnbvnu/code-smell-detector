function get_bracket_close(open) {
    if (open === SQUARE_BRACKET_OPEN) {
      return SQUARE_BRACKET_CLOSE;
    }
    if (open === CURLY_BRACKET_OPEN) {
      return CURLY_BRACKET_CLOSE;
    }
  }