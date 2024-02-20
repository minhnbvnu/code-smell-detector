function extractSingleFontFamily(fontFamilyString) {
  // ART on the web allows for multiple font-families to be specified.
  // For compatibility, we extract the first font-family, hoping
  // we'll get a match.
  return fontFamilyString.split(',')[0]
         .replace(fontFamilyPrefix, '')
         .replace(fontFamilySuffix, '');
}