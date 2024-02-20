function generateArtboardCss(ab, cssRules, settings) {
  var t3 = '\t',
      t4 = t3 + '\t',
      abId = '#' + nameSpace + getArtboardFullName(ab, settings),
      css = '';
  css += t3 + abId + ' {\r';
  css += t4 + 'position:relative;\r';
  css += t4 + 'overflow:hidden;\r';
  css += t3 + '}\r';

  // classes for paragraph and character styles
  forEach(cssRules, function(cssBlock) {
    css += t3 + abId + ' ' + cssBlock;
  });
  return css;
}