function convertTextFrames(textFrames, ab, settings) {
  var frameData = map(textFrames, function(frame) {
    return {
      paragraphs: importTextFrameParagraphs(frame)
    };
  });
  var pgStyles = [];
  var charStyles = [];
  var baseStyle = deriveTextStyleCss(frameData);
  var idPrefix = nameSpace + 'ai' + getArtboardId(ab) + '-';
  var abBox = convertAiBounds(ab.artboardRect);
  var divs = map(frameData, function(obj, i) {
    var frame = textFrames[i];
    var divId = frame.name ? makeKeyword(frame.name) : idPrefix  + (i + 1);
    var positionCss = getTextFrameCss(frame, abBox, obj.paragraphs, settings);
    return '\t\t<div id="' + divId + '" ' + positionCss + '>' +
        generateTextFrameHtml(obj.paragraphs, baseStyle, pgStyles, charStyles) + '\r\t\t</div>\r';
  });

  var allStyles = pgStyles.concat(charStyles);
  var cssBlocks = map(allStyles, function(obj) {
    return '.' + obj.classname + ' {' + formatCss(obj.style, '\t\t') + '\t}\r';
  });
  if (divs.length > 0) {
    cssBlocks.unshift('p {' + formatCss(baseStyle, '\t\t') + '\t}\r');
  }

  return {
    styles: cssBlocks,
    html: divs.join('')
  };
}