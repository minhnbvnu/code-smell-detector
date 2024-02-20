function findHostElements(rootElement) {
        var hosts = [];
        if (rootElement) {
          var domElems = rootElement.querySelectorAll("*");
          domElems.forEach(function (el) {
            if (el.shadowRoot) {
              hosts.push(el);
            }
          });
        }
        return hosts;
      }