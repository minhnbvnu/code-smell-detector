function check_graph_for_cycles(edges) {
    const graph = edges.reduce((g2, edge) => {
      const [u, v2] = edge;
      if (!g2.has(u))
        g2.set(u, []);
      if (!g2.has(v2))
        g2.set(v2, []);
      g2.get(u).push(v2);
      return g2;
    }, /* @__PURE__ */ new Map());
    const visited = /* @__PURE__ */ new Set();
    const on_stack = /* @__PURE__ */ new Set();
    const cycles = [];
    function visit(v2) {
      visited.add(v2);
      on_stack.add(v2);
      graph.get(v2).forEach((w2) => {
        if (!visited.has(w2)) {
          visit(w2);
        } else if (on_stack.has(w2)) {
          cycles.push([...on_stack, w2]);
        }
      });
      on_stack.delete(v2);
    }
    graph.forEach((_2, v2) => {
      if (!visited.has(v2)) {
        visit(v2);
      }
    });
    return cycles[0];
  }