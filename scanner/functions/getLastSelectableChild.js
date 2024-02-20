function getLastSelectableChild(element) {
      var TEXT_NODE = 3;

      if (element) {
        if (element.nodeType !== TEXT_NODE) {
          var child = element.lastChild;
          while (child) {
            if (isSelectable(child) === true) {
              return child;
            } else if (child.lastChild) {
              // This node does have child nodes.
              var res = getLastSelectableChild(child);
              if (res !== null) {
                return res;
              } else {
                child = child.previousSibling;
              }
            } else {
              child = child.previousSibling;
            }
          }
        } else {
          // Given element is a text node so return it.
          return element;
        }
      }
      return null;
    }