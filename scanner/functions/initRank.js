function initRank(g) {
  var sorted = topsort(g);

  sorted.forEach(function(u) {
    var inEdges = g.inEdges(u);
    if (inEdges.length === 0) {
      g.node(u).rank = 0;
      return;
    }

    var minLens = inEdges.map(function(e) {
      return g.node(g.source(e)).rank + g.edge(e).minLen;
    });
    g.node(u).rank = util.max(minLens);
  });
}