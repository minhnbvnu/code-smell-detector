function replaceQuotes(string) {
    // string = string.replace(/'/g,"\\'")
    if (string.indexOf("'") > -1) {
      string = string.replace(/'/g, "\\'")
    }
    return string;
  }