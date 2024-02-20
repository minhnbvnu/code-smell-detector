function generateArtboardDiv(ab, settings) {
  var id = nameSpace + getArtboardFullName(ab, settings);
  var classname = nameSpace + 'artboard';
  var widthRange = getArtboardWidthRange(ab, settings);
  var visibleRange = getArtboardVisibilityRange(ab, settings);
  var abBox = convertAiBounds(ab.artboardRect);
  var aspectRatio = abBox.width / abBox.height;
  var inlineStyle = '';
  var inlineSpacerStyle = '';
  var html = '';

  // Set size of graphic using inline CSS
  if (widthRange[0] == widthRange[1]) {
    // fixed width
    // inlineSpacerStyle += "width:" + abBox.width + "px; height:" + abBox.height + "px;";
    inlineStyle += 'width:' + abBox.width + 'px; height:' + abBox.height + 'px;';
  } else {
    // Set height of dynamic artboards using vertical padding as a %, to preserve aspect ratio.
    inlineSpacerStyle = 'padding: 0 0 ' + formatCssPct(abBox.height, abBox.width) + ' 0;';
    if (widthRange[0] > 0) {
      inlineStyle += 'min-width: ' + widthRange[0] + 'px;';
    }
    if (widthRange[1] < Infinity) {
      inlineStyle += 'max-width: ' + widthRange[1] + 'px;';
      inlineStyle += 'max-height: ' + Math.round(widthRange[1] / aspectRatio) + 'px';
    }
  }

  html += '\t<div id="' + id + '" class="' + classname + '" style="' + inlineStyle + '"';
  html += ' data-aspect-ratio="' + roundTo(aspectRatio, 3) + '"';
  if (isTrue(settings.include_resizer_widths)) {
    html += ' data-min-width="' + visibleRange[0] + '"';
    if (visibleRange[1] < Infinity) {
      html +=  ' data-max-width="' + visibleRange[1] + '"';
    }
  }
  html += '>\r';
  // add spacer div
  html += '<div style="' + inlineSpacerStyle + '"></div>\n';
  return html;
}