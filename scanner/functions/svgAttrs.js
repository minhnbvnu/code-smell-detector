function svgAttrs(str) {
  var width   = str.match(SVG_WIDTH_RE);
  var height  = str.match(SVG_HEIGHT_RE);
  var viewbox = str.match(SVG_VIEWBOX_RE);

  return {
    width:   width && (width[1] || width[2]),
    height:  height && (height[1] || height[2]),
    viewbox: viewbox && (viewbox[1] || viewbox[2])
  };
}