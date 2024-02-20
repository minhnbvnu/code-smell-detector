function exportSymbolAsHtml(item, geometries, abBox, opts) {
  var html = '';
  var style = getBasicSymbolStyle(item);
  var properties = item.name ? 'data-name="' + makeKeyword(item.name) + '" ' : '';
  var geom, x, y;
  for (var i=0; i<geometries.length; i++) {
    geom = geometries[i];
    // make center coords relative to top,left of artboard
    x = geom.center[0] - abBox.left;
    y = -geom.center[1] - abBox.top;
    geom.center = [x, y];
    html += '\r\t\t\t' + '<div class="' + getSymbolClass() + '" ' + properties +
      getBasicSymbolCss(geom, style, abBox, opts) + '></div>';
  }
  return html;
}