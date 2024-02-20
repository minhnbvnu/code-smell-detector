function setAttributeBySelector(source, selector, attribute, value) {
        var attributeSetter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultAttributeSetter;
        var elements;
        try {
          elements = document.querySelectorAll(selector);
        } catch (_unused) {
          logMessage(source, 'Failed to find elements matching selector "'.concat(selector, '"'));
          return;
        }
        if (!elements || elements.length === 0) {
          return;
        }
        try {
          elements.forEach(function (elem) {
            return attributeSetter(elem, attribute, value);
          });
          hit(source);
        } catch (_unused2) {
          logMessage(source, "Failed to set [".concat(attribute, '="').concat(value, '"] to each of selected elements.'));
        }
      }