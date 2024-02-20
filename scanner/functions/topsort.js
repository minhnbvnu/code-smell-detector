function topsort(g) {
  if (!g.isDirected()) {
    throw new Error("topsort can only be applied to a directed graph. Bad input: " + g);
  }

  var visited = {};
  var stack = {};
  var results = [];

  function visit(node) {
    if (node in stack) {
      throw new CycleException();
    }

    if (!(node in visited)) {
      stack[node] = true;
      visited[node] = true;
      g.predecessors(node).forEach(function(pred) {
        visit(pred);
      });
      delete stack[node];
      results.push(node);
    }
  }

  var sinks = g.sinks();
  if (g.order() !== 0 && sinks.length === 0) {
    throw new CycleException();
  }

  g.sinks().forEach(function(sink) {
    visit(sink);
  });

  return results;
}