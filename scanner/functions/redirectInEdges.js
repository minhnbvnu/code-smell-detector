function redirectInEdges(g, u, newU, reverse) {
  g.inEdges(u).forEach(function(e) {
    var origValue = g.edge(e),
        value;
    if (origValue.originalEdge) {
      value = origValue;
    } else {
      value =  {
        originalEdge: { e: e, u: g.source(e), v: g.target(e), value: origValue },
        minLen: g.edge(e).minLen
      };
    }

    // Do not reverse edges for self-loops.
    if (origValue.selfLoop) {
      reverse = false;
    }

    if (reverse) {
      // Ensure that all edges to min are reversed
      g.addEdge(null, newU, g.source(e), value);
      value.reversed = true;
    } else {
      g.addEdge(null, g.source(e), newU, value);
    }
  });
}