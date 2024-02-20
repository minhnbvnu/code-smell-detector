function findOutletComponentNode(nodes, instance) {
    let result;

    for (let node of nodes) {
      if (node.type === 'component') {
        if (node.instance === instance) {
          result = node;
        } else {
          result = findOutletComponentNode(node.children, instance);
        }
      }

      if (result !== undefined) {
        return result;
      }
    }
  }