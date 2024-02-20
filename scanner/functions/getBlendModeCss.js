function getBlendModeCss(ai) {
  for (var k=0; k<blendModes.length; k++) {
    if (ai == blendModes[k].ai) {
      return blendModes[k].html;
    }
  }
  return '';
}