function findCalls(node) {
      if (node.frame === focalFrame) {
        recordSubtree(node);
      } else {
        for (let child of node.children) {
          findCalls(child);
        }
      }
    }