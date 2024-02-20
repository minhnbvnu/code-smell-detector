function generatePageCss(containerId, settings) {
  var css = '';
  var t2 = '\t';
  var t3 = '\r\t\t';
  var blockStart = t2 + '#' + containerId + ' ';
  var blockEnd = '\r' + t2 + '}\r';

  if (settings.max_width) {
    css += blockStart + '{';
    css += t3 + 'max-width:' + settings.max_width + 'px;';
    css += blockEnd;
  }
  if (isTrue(settings.center_html_output)) {
    css += blockStart + ',\r' + blockStart + '.' + nameSpace + 'artboard {';
    css += t3 + 'margin:0 auto;';
    css += blockEnd;
  }
  if (settings.alt_text) {
    css += blockStart + ' .' + nameSpace + 'aiAltText {';
    css += t3 + 'position: absolute;';
    css += t3 + 'left: -10000px;';
    css += t3 + 'width: 1px;';
    css += t3 + 'height: 1px;';
    css += t3 + 'overflow: hidden;';
    css += t3 + 'white-space: nowrap;';
    css += blockEnd;
  }
  if (settings.clickable_link !== '') {
    css += blockStart + ' .' + nameSpace + 'ai2htmlLink {';
    css += t3 + 'display: block;';
    css += blockEnd;
  }
  // default <p> styles
  css += blockStart + 'p {';
  css += t3 + 'margin:0;';
  if (isTrue(settings.testing_mode)) {
    css += t3 + 'color: rgba(209, 0, 0, 0.5) !important;';
  }
  css += blockEnd;

  css += blockStart + '.' + nameSpace + 'aiAbs {';
  css += t3 + 'position:absolute;';
  css += blockEnd;

  css += blockStart + '.' + nameSpace + 'aiImg {';
  css += t3 + 'position:absolute;';
  css += t3 + 'top:0;';
  css += t3 + 'display:block;';
  css += t3 + 'width:100% !important;';
  css += blockEnd;

  css += blockStart + '.' + getSymbolClass() + ' {';
  css += t3 + 'position: absolute;';
  css += t3 + 'box-sizing: border-box;';
  css += blockEnd;

  css += blockStart + '.' + nameSpace + 'aiPointText p { white-space: nowrap; }\r';
  return css;
}