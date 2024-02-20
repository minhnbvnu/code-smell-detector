function getJustificationCss(ai) {
  for (var k=0; k<align.length; k++) {
    if (ai == align[k].ai) {
      return align[k].html;
    }
  }
  return 'initial'; // CSS default
}