function childContentWrapper(element) {
        var wrapper = undefined;
        for (var c = element.firstChild; c; c = c.nextSibling) {
          var type = c.nodeType;
          wrapper = (type === 1)  // Element Node
            ? (wrapper ? element : c)
            : (type === 3)  // Text Node
            ? (notWs.test(c.nodeValue) ? element : wrapper)
            : wrapper;
        }
        return wrapper === element ? undefined : wrapper;
      }