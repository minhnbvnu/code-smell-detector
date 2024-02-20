function findOutletComponentParent(nodes) {
    let result;

    for (let node of nodes) {
      if (node.type === 'component') {
        result = node.instance.parentView;
      } else if (node.type === 'engine' || node.type === 'route-template') {
        result = findOutletComponentParent(node.children);
      }

      if (result !== undefined) {
        return result;
      }
    }
  }