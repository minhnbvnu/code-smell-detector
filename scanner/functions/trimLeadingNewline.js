function trimLeadingNewline(text, characterMeta) {
  if (text.charAt(0) === '\n') {
    text = text.slice(1);
    characterMeta = characterMeta.slice(1);
  }
  return { text: text, characterMeta: characterMeta };
}