function removeIgnoredNodes(node) {
        if (node._listIgnore) {
          node.remove();
          return;
        }
        if (node = node.firstChild) {
          do {
            removeIgnoredNodes(node);
          } while (node = node.next);
        }
      }