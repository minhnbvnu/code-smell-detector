function skipSpace(str, pos) {
    while (/\s/.test(str.charAt(pos))) ++pos;
    return pos;
  }