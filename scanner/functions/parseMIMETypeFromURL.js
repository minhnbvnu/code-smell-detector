function parseMIMETypeFromURL(url) {
    const matches3 = DATA_URL_PATTERN.exec(url);
    if (matches3) {
      return matches3[1];
    }
    return "";
  }