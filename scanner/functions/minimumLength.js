function minimumLength(graph, u, v) {
  var outEdges = graph.outEdges(u, v);
  if (outEdges.length > 0) {
    return util.max(outEdges.map(function(e) {
      return graph.edge(e).minLen;
    }));
  }

  var inEdges = graph.inEdges(u, v);
  if (inEdges.length > 0) {
    return -util.max(inEdges.map(function(e) {
      return graph.edge(e).minLen;
    }));
  }
}