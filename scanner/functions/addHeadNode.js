function addHeadNode(node) {
        if (headElement.firstChild) {
          headElement.insert(node, headElement.firstChild);
        } else {
          headElement.append(node);
        }
      }