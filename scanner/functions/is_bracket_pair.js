function is_bracket_pair(open, close) {
    return open === SQUARE_BRACKET_OPEN && close === SQUARE_BRACKET_CLOSE || open === CURLY_BRACKET_OPEN && close === CURLY_BRACKET_CLOSE;
  }