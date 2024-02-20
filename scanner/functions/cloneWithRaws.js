function cloneWithRaws(node) {
      if (node.nodes) {
        const oldNodes = node.nodes;
        node.nodes = [];
        const clone = node.clone({ raws: node.raws });
        node.nodes = oldNodes;
        for (const clonedChild of oldNodes.map(cloneWithRaws)) {
          clone.append(clonedChild);
        }
        return clone;
      } else {
        return node.clone({ raws: node.raws });
      }
    }