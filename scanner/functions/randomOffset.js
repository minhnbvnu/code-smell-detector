function randomOffset(node) {
      return (
        (Math.random() *
          (1 +
            (node.nodeType === 3 ? node.nodeValue : node.childNodes).length)) |
        0
      );
    }