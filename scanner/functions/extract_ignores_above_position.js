function extract_ignores_above_position(position, template_nodes) {
    const previous_node_idx = template_nodes.findIndex((child) => child.end === position);
    if (previous_node_idx === -1) {
      return [];
    }
    for (let i = previous_node_idx; i >= 0; i--) {
      const node2 = template_nodes[i];
      if (node2.type !== "Comment" && node2.type !== "Text") {
        return [];
      }
      if (node2.type === "Comment") {
        if (node2.ignores.length) {
          return node2.ignores;
        }
      }
    }
    return [];
  }