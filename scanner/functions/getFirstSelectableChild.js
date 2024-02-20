function getFirstSelectableChild(element) {
      var TEXT_NODE = 3;

      if (element) {
        if (element.nodeType !== TEXT_NODE) {
          var child = element.firstChild;
          while (child) {
            if (isSelectable(child) === true) {
              return child;
            } else if (child.firstChild) {
              // This node does have child nodes.
              var res = getFirstSelectableChild(child);
              if (res !== null) {
                return res;
              } else {
                child = child.nextSibling;
              }
            } else {
              child = child.nextSibling;
            }
          }
        } else {
          // Given element is a text node so return it.
          return element;
        }
      }
      return null;
    }