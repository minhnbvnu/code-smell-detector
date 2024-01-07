function getFontFileType(file, {
    type,
    subtype,
    composite
  }) {
    let fileType, fileSubtype;

    if (isTrueTypeFile(file) || isTrueTypeCollectionFile(file)) {
      if (composite) {
        fileType = "CIDFontType2";
      } else {
        fileType = "TrueType";
      }
    } else if (isOpenTypeFile(file)) {
      if (composite) {
        fileType = "CIDFontType2";
      } else {
        fileType = "OpenType";
      }
    } else if (isType1File(file)) {
      if (composite) {
        fileType = "CIDFontType0";
      } else {
        fileType = type === "MMType1" ? "MMType1" : "Type1";
      }
    } else if (isCFFFile(file)) {
      if (composite) {
        fileType = "CIDFontType0";
        fileSubtype = "CIDFontType0C";
      } else {
        fileType = type === "MMType1" ? "MMType1" : "Type1";
        fileSubtype = "Type1C";
      }
    } else {
      (0, _util.warn)("getFontFileType: Unable to detect correct font file Type/Subtype.");
      fileType = type;
      fileSubtype = subtype;
    }

    return [fileType, fileSubtype];
  }