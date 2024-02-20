function parseMIMEType(mimeString) {
    const matches3 = MIME_TYPE_PATTERN.exec(mimeString);
    if (matches3) {
      return matches3[1];
    }
    return mimeString;
  }