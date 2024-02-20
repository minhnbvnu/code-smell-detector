function found(node) {
    if (node === null) {
      return false;
    }

    if (!node.visited) {
      // eslint-disable-next-line no-param-reassign
      node.visited = true;
      nodeStack.push(node);
    }

    return matches(node.data);
  }