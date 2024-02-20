function fixupEdgePoints(g) {
    g.eachEdge(function(e, s, t, a) { if (a.reversed) a.points.reverse(); });
  }