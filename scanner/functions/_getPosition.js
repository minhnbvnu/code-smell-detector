function _getPosition(node) {
      if (endNode === node) {
        charPos += offset;
        return true;
      }
      if (node.nodeType === window.Node.TEXT_NODE) {
        charPos += node.textContent.length;
      } else if (node.nodeType === window.Node.ELEMENT_NODE) {
        // external nodes have a length of 1
        // they are attached to an invisible character
        // but may have a custom rendering
        if ($(node).data('external')) {
          charPos += 1;
          return false;
        }
        for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling) {
          if (_getPosition(childNode)) {
            return true;
          }
        }
      }
      return false;
    }