function preorder(g, root, f) {
  var visited = new Set();
  if (g.isDirected()) {
    throw new Error("This function only works for undirected graphs");
  }
  function dfs(u, prev) {
    if (visited.has(u)) {
      throw new Error("The input graph is not a tree: " + g);
    }
    visited.add(u);
    f(u);
    g.neighbors(u).forEach(function(v) {
      if (v !== prev) dfs(v, u);
    });
  }
  dfs(root);
}