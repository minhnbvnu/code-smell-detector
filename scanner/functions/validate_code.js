function validate_code(code) {
    if (code === 10) {
      return 32;
    }
    if (code < 128) {
      return code;
    }
    if (code <= 159) {
      return windows_1252[code - 128];
    }
    if (code < 55296) {
      return code;
    }
    if (code <= 57343) {
      return NUL;
    }
    if (code <= 65535) {
      return code;
    }
    if (code >= 65536 && code <= 131071) {
      return code;
    }
    if (code >= 131072 && code <= 196607) {
      return code;
    }
    return NUL;
  }