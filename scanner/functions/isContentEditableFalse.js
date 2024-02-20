function isContentEditableFalse(node) {
      return node && node.nodeType === 1 && node.contentEditable === 'false';
    }