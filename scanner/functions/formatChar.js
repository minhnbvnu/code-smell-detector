function formatChar(c) {
    var replacements = {
      "'": "\\'",
      '"': '\\"',
      '\\': '\\\\',
      '\b': '\\b',
      '\f': '\\f',
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\v': '\\v',
      '\0': '\\0',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029'
    };

    if (replacements[c]) {
      return replacements[c];
    }

    if (c < ' ') {
      var hexString = c.charCodeAt(0).toString(16);
      return '\\x' + ('00' + hexString).substring(hexString.length);
    }

    return c;
  }