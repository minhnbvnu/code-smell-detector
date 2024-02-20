function full_char_code_at(str, i) {
    const code = str.charCodeAt(i);
    if (code <= 55295 || code >= 57344)
      return code;
    const next = str.charCodeAt(i + 1);
    return (code << 10) + next - 56613888;
  }