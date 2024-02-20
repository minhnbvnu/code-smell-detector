function applyStyle(style, domNode) {
  if (style) {
    var currStyle = domNode.attr('style') || '';
    domNode.attr('style', currStyle + '; ' + style);
  }
}