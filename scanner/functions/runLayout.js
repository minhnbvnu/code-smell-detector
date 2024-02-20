function runLayout(graph, layout) {
  var result = layout.run(graph);

  // Copy labels to the result graph
  graph.eachNode(function(u, value) { result.node(u).label = value.label; });
  graph.eachEdge(function(e, u, v, value) { result.edge(e).label = value.label; });

  return result;
}