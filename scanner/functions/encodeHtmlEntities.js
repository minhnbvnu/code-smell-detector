function encodeHtmlEntities(text) {
  return replaceChars(text, basicCharacterReplacements.concat(extraCharacterReplacements));
}