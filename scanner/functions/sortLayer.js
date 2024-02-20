function sortLayer(g, cg, weights) {
  weights = adjustWeights(g, weights);
  var result = sortLayerSubgraph(g, null, cg, weights);

  result.list.forEach(function(u, i) {
    g.node(u).order = i;
  });
  return result.constraintGraph;
}