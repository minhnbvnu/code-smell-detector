function slack(graph, u, v, minLen) {
  return Math.abs(graph.node(u).rank - graph.node(v).rank) - minLen;
}