function collectCharacters(regEx) {
      var chars,
        match = regEx.exec(input.substring(pos));
      if (match) {
        chars = match[0];
        pos += chars.length;
        return chars;
      }
    }