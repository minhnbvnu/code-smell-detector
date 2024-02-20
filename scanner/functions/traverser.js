function traverser(node, path, state) {
    node.range && utils.catchup(node.range[0], state);
    traverse(node, path, state);
    node.range && utils.catchup(node.range[1], state);
  }