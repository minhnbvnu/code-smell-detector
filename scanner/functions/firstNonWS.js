function firstNonWS(str) {
    var found = str.search(nonWS);
    return found == -1 ? 0 : found;
  }