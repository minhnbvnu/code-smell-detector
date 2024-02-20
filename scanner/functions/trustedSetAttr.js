function trustedSetAttr(source, selector, attr) {
        var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        if (!selector || !attr) {
          return;
        }
        setAttributeBySelector(source, selector, attr, value);
        observeDOMChanges(function () {
          return setAttributeBySelector(source, selector, attr, value);
        }, true);
      }