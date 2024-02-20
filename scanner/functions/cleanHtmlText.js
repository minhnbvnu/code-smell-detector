function cleanHtmlText(text) {
  // Characters "<>& are not replaced
  return replaceChars(text, extraCharacterReplacements);
}