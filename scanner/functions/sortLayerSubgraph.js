function sortLayerSubgraph(g, sg, cg, weights) {
  cg = cg ? cg.filterNodes(nodesFromList(g.children(sg))) : new Digraph();

  var nodeData = {};
  g.children(sg).forEach(function(u) {
    if (g.children(u).length) {
      nodeData[u] = sortLayerSubgraph(g, u, cg, weights);
      nodeData[u].firstSG = u;
      nodeData[u].lastSG = u;
    } else {
      var ws = weights[u];
      nodeData[u] = {
        degree: ws.length,
        barycenter: util.sum(ws) / ws.length,
        order: g.node(u).order,
        orderCount: 1,
        list: [u]
      };
    }
  });

  resolveViolatedConstraints(g, cg, nodeData);

  var keys = Object.keys(nodeData);
  keys.sort(function(x, y) {
    return nodeData[x].barycenter - nodeData[y].barycenter ||
           nodeData[x].order - nodeData[y].order;
  });

  var result =  keys.map(function(u) { return nodeData[u]; })
                    .reduce(function(lhs, rhs) { return mergeNodeData(g, lhs, rhs); });
  return result;
}