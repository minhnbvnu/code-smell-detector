function unwrapElement(element) {
        var parentNode = element.parentNode;
        while (element.childNodes.length > 0) {
          parentNode.insertBefore(element.childNodes[0], element);
        }
        parentNode.removeChild(element);
      }