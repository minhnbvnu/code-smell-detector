function getGrammarSelectionContent(buffer) {
  return buffer.getTextInRange(
    Range(Point(0, 0), buffer.positionForCharacterIndex(1024))
  );
}