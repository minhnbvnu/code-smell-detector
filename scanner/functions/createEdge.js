function createEdge(graph, from, to, type, attr) {
    var edge = {
      from: from,
      to: to,
      type: type
    };

    if (graph.edge) {
      edge.attr = merge({}, graph.edge); // clone default attributes
    }
    edge.attr = merge(edge.attr || {}, attr); // merge attributes

    return edge;
  }