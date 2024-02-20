function graticuleX(y0, y1, dy) {
  var y = range(y0, y1 - epsilon, dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}