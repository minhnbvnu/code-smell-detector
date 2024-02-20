function crossCount(g) {
  var cc = 0;
  var ordering = util.ordering(g);
  for (var i = 1; i < ordering.length; ++i) {
    cc += twoLayerCrossCount(g, ordering[i-1], ordering[i]);
  }
  return cc;
}