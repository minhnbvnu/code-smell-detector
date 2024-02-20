function getCapitalizationCss(ai) {
  for (var k=0; k<caps.length; k++) {
    if (ai == caps[k].ai) {
      return caps[k].html;
    }
  }
  return '';
}