function findUnescapedSeparators(str, separator) {
      if (!separator)
        separator = '/';

      var escapeNextChar = false;
      var slashes = [];
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (!escapeNextChar && c == separator) {
          slashes.push(i);
        }
        escapeNextChar = !escapeNextChar && (c == '\\');
      }
      return slashes;
    }