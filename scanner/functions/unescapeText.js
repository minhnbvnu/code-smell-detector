function unescapeText(text) {
      return text.replace(escapedStartRegexp, startSymbol).
        replace(escapedEndRegexp, endSymbol);
    }