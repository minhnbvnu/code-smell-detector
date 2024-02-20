function countRules(node) {
    let count = 0;

    if (node.selector) {
      count += node.selector.split(',').length;
    }

    if (Array.isArray(node.nodes)) {
      // FIXME: Verify that this counting algorithm is identical to what IE does
      for (const childNode of node.nodes) {
        count += countRules(childNode);
      }
    }

    return count;
  }