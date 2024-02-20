function findFontInfo(aifont) {
  var info = null;
  for (var k=0; k<fonts.length; k++) {
    if (aifont == fonts[k].aifont) {
      info = fonts[k];
      break;
    }
  }
  if (!info) {
    // font not found... parse the AI font name to give it a weight and style
    info = {};
    if (aifont.indexOf('Italic') > -1) {
      info.style = 'italic';
    }
    if (aifont.indexOf('Bold') > -1) {
      info.weight = 700;
    } else {
      info.weight = 500;
    }
  }
  return info;
}