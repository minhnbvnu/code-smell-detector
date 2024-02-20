function hasOneTime(tokens) {
    var i = tokens.length;
    while (i--) {
      if (tokens[i].oneTime) return true;
    }
  }