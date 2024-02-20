function enterEdge(graph, tree, e) {
  var source = tree.source(e);
  var target = tree.target(e);
  var lower = tree.node(target).lim < tree.node(source).lim ? target : source;

  // Is the tree edge aligned with the graph edge?
  var aligned = !tree.edge(e).reversed;

  var minSlack = Number.POSITIVE_INFINITY;
  var minSlackEdge;
  if (aligned) {
    graph.eachEdge(function(id, u, v, value) {
      if (id !== e && inSubtree(tree, u, lower) && !inSubtree(tree, v, lower)) {
        var slack = rankUtil.slack(graph, u, v, value.minLen);
        if (slack < minSlack) {
          minSlack = slack;
          minSlackEdge = id;
        }
      }
    });
  } else {
    graph.eachEdge(function(id, u, v, value) {
      if (id !== e && !inSubtree(tree, u, lower) && inSubtree(tree, v, lower)) {
        var slack = rankUtil.slack(graph, u, v, value.minLen);
        if (slack < minSlack) {
          minSlack = slack;
          minSlackEdge = id;
        }
      }
    });
  }

  if (minSlackEdge === undefined) {
    var outside = [];
    var inside = [];
    graph.eachNode(function(id) {
      if (!inSubtree(tree, id, lower)) {
        outside.push(id);
      } else {
        inside.push(id);
      }
    });
    throw new Error('No edge found from outside of tree to inside');
  }

  return minSlackEdge;
}