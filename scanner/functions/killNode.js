function killNode(node) {
          var tmp = node.nextSibling;
          node.parentNode.removeChild(node);
          return tmp;
        }