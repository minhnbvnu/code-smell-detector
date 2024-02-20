function sort_consts_nodes(consts_nodes, component) {
    const sorted_consts_nodes = [];
    const unsorted_consts_nodes = consts_nodes.map((node2) => {
      return {
        assignees: node2.assignees,
        dependencies: node2.dependencies,
        node: node2
      };
    });
    const lookup = /* @__PURE__ */ new Map();
    unsorted_consts_nodes.forEach((node2) => {
      node2.assignees.forEach((name2) => {
        if (!lookup.has(name2)) {
          lookup.set(name2, []);
        }
        lookup.get(name2).push(node2);
      });
    });
    const cycle = check_graph_for_cycles(unsorted_consts_nodes.reduce((acc, node2) => {
      node2.assignees.forEach((v2) => {
        node2.dependencies.forEach((w2) => {
          if (!node2.assignees.has(w2)) {
            acc.push([v2, w2]);
          }
        });
      });
      return acc;
    }, []));
    if (cycle && cycle.length) {
      const nodeList = lookup.get(cycle[0]);
      const node2 = nodeList[0];
      component.error(node2.node, compiler_errors.cyclical_const_tags(cycle));
    }
    const add_node = (node2) => {
      if (sorted_consts_nodes.includes(node2))
        return;
      node2.dependencies.forEach((name2) => {
        if (node2.assignees.has(name2))
          return;
        const earlier_nodes = lookup.get(name2);
        if (earlier_nodes) {
          earlier_nodes.forEach(add_node);
        }
      });
      sorted_consts_nodes.push(node2);
    };
    unsorted_consts_nodes.forEach(add_node);
    return sorted_consts_nodes.map((node2) => node2.node);
  }