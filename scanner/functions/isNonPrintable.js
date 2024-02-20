function isNonPrintable(code) {
    return code >= 0 && code <= 8 || code === 11 || code >= 14 && code <= 31 || code === 127;
  }