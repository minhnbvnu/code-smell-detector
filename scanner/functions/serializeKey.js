function serializeKey(key) {
      if (key.length === 0) {
        return quoteString(key, true);
      }

      var firstChar = String.fromCodePoint(key.codePointAt(0));

      if (!util.isIdStartChar(firstChar)) {
        return quoteString(key, true);
      }

      for (var i = firstChar.length; i < key.length; i++) {
        if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
          return quoteString(key, true);
        }
      }

      return key;
    }