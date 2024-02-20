function collapseWhiteSpace(text, characterMeta) {
  text = text.replace(/[ \t\n]/g, ' ');

  var _trimLeadingSpace = trimLeadingSpace(text, characterMeta);

  text = _trimLeadingSpace.text;
  characterMeta = _trimLeadingSpace.characterMeta;

  var _trimTrailingSpace = trimTrailingSpace(text, characterMeta);

  text = _trimTrailingSpace.text;
  characterMeta = _trimTrailingSpace.characterMeta;

  var i = text.length;
  while (i--) {
    if (text.charAt(i) === ' ' && text.charAt(i - 1) === ' ') {
      text = text.slice(0, i) + text.slice(i + 1);
      characterMeta = characterMeta.slice(0, i).concat(characterMeta.slice(i + 1));
    }
  }

  var _replaceTextWithMeta = (0, _replaceTextWithMeta4.default)({ text: text, characterMeta: characterMeta }, SOFT_BREAK_PLACEHOLDER + ' ', SOFT_BREAK_PLACEHOLDER);

  text = _replaceTextWithMeta.text;
  characterMeta = _replaceTextWithMeta.characterMeta;

  var _replaceTextWithMeta2 = (0, _replaceTextWithMeta4.default)({ text: text, characterMeta: characterMeta }, ' ' + SOFT_BREAK_PLACEHOLDER, SOFT_BREAK_PLACEHOLDER);

  text = _replaceTextWithMeta2.text;
  characterMeta = _replaceTextWithMeta2.characterMeta;

  return { text: text, characterMeta: characterMeta };
}