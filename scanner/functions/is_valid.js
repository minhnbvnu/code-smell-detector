function is_valid(str) {
    let i = 0;
    while (i < str.length) {
      const code = full_char_code_at(str, i);
      if (!(i === 0 ? isIdentifierStart : isIdentifierChar)(code, true))
        return false;
      i += code <= 65535 ? 1 : 2;
    }
    return true;
  }