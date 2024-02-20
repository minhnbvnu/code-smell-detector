function concatFragments(fragments) {
  var text = '';
  var characterMeta = (0, _immutable.Seq)();
  fragments.forEach(function (textFragment) {
    text = text + textFragment.text;
    characterMeta = characterMeta.concat(textFragment.characterMeta);
  });
  return { text: text, characterMeta: characterMeta };
}