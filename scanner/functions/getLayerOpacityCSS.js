function getLayerOpacityCSS(layer) {
  var o = getComputedOpacity(layer);
  return o < 100 ? 'opacity:' + roundTo(o / 100, 2) + ';' : '';
}