function getParentCondition(node) {
    while (true) {
      if (node.type === 19) {
        if (node.alternate.type === 19) {
          node = node.alternate;
        } else {
          return node;
        }
      } else if (node.type === 20) {
        node = node.value;
      }
    }
  }