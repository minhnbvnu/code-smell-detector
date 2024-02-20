function NameEntry(raw, entry) {
    this.raw = raw;
    this.length = raw.length;
    this.platformID = entry.platformID;
    this.encodingID = entry.encodingID;
    this.languageID = entry.languageID;
  }