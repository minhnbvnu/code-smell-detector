function _countCharacters(el) {
      var type = el.nodeType;
      if (type === window.Node.TEXT_NODE) {
        return el.textContent.length;
      } else if (type === window.Node.ELEMENT_NODE) {
        if ($(el).data('external')) {
          return 1;
        } else {
          var count = 0;
          for (var childNode = el.firstChild; childNode; childNode = childNode.nextSibling) {
            count += _countCharacters(childNode);
          }
          return count;
        }
      }
      return 0;
    }