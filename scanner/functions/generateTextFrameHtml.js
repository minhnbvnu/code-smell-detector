function generateTextFrameHtml(paragraphs, baseStyle, pStyles, cStyles) {
  var html = '';
  for (var i=0; i<paragraphs.length; i++) {
    html += '\r\t\t\t' + generateParagraphHtml(paragraphs[i], baseStyle, pStyles, cStyles);
  }
  return html;
}