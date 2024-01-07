function getFontType(type, subtype) {
  switch (type) {
    case "Type1":
      return subtype === "Type1C" ? _util.FontType.TYPE1C : _util.FontType.TYPE1;

    case "CIDFontType0":
      return subtype === "CIDFontType0C" ? _util.FontType.CIDFONTTYPE0C : _util.FontType.CIDFONTTYPE0;

    case "OpenType":
      return _util.FontType.OPENTYPE;

    case "TrueType":
      return _util.FontType.TRUETYPE;

    case "CIDFontType2":
      return _util.FontType.CIDFONTTYPE2;

    case "MMType1":
      return _util.FontType.MMTYPE1;

    case "Type0":
      return _util.FontType.TYPE0;

    default:
      return _util.FontType.UNKNOWN;
  }
}