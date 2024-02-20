function getFontType(type, subtype) {
  switch (type) {
    case 'Type1':
      return subtype === 'Type1C' ? FontType.TYPE1C : FontType.TYPE1;
    case 'CIDFontType0':
      return subtype === 'CIDFontType0C' ? FontType.CIDFONTTYPE0C :
        FontType.CIDFONTTYPE0;
    case 'OpenType':
      return FontType.OPENTYPE;
    case 'TrueType':
      return FontType.TRUETYPE;
    case 'CIDFontType2':
      return FontType.CIDFONTTYPE2;
    case 'MMType1':
      return FontType.MMTYPE1;
    case 'Type0':
      return FontType.TYPE0;
    default:
      return FontType.UNKNOWN;
  }
}