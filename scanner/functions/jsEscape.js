function jsEscape(s) {
    return s.replace(/(["\\])/g, '\\$1')
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f")
  }