function extract_ignores_above_node(node2) {
    let cur_node = node2.prev;
    while (cur_node) {
      if (cur_node.type !== "Comment" && cur_node.type !== "Text") {
        return [];
      }
      if (cur_node.type === "Comment" && cur_node.ignores.length) {
        return cur_node.ignores;
      }
      cur_node = cur_node.prev;
    }
    return [];
  }