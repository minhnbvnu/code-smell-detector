function replaceWhitespace(str) {
      var i = 0,
          ii = str.length,
          code;

      while (i < ii && (code = str.charCodeAt(i)) >= 0x20 && code <= 0x7f) {
        i++;
      }

      return i < ii ? str.replace(WhitespaceRegexp, " ") : str;
    }