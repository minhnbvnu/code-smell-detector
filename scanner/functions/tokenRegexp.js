function tokenRegexp(words) {
    return new RegExp("^" + words.join("|"));
  }