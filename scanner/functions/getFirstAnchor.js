function getFirstAnchor(list) {
      var result = null;
      Array.prototype.some.call(list, function(element) {
        if (nodeName_(element) === 'a') {
          result = element;
          return true;
        }
      });
      return result;
    }