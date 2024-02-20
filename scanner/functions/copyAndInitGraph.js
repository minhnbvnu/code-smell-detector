function copyAndInitGraph(graph) {
  var copy = graph.copy();

  if (copy.graph() === undefined) {
    copy.graph({});
  }

  if (!('arrowheadFix' in copy.graph())) {
    copy.graph().arrowheadFix = true;
  }

  // Init labels if they were not present in the source graph
  copy.nodes().forEach(function(u) {
    var value = copyObject(copy.node(u));
    copy.node(u, value);
    if (!('label' in value)) { value.label = ''; }
  });

  copy.edges().forEach(function(e) {
    var value = copyObject(copy.edge(e));
    copy.edge(e, value);
    if (!('label' in value)) { value.label = ''; }
  });

  return copy;
}