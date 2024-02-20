function setAttr$1(source, selector, attr) {
      var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      if (!selector || !attr) {
        return;
      }
      var allowedValues = ['true', 'false'];
      var shouldCopyValue = value.startsWith('[') && value.endsWith(']');
      var isValidValue = value.length === 0 || !nativeIsNaN(parseInt(value, 10)) && parseInt(value, 10) > 0 && parseInt(value, 10) < 32767 || allowedValues.includes(value.toLowerCase());
      if (!shouldCopyValue && !isValidValue) {
        logMessage(source, "Invalid attribute value provided: '".concat(convertTypeToString(value), "'"));
        return;
      }

      /**
       * Defining value extraction logic here allows us to remove
       * excessive `shouldCopyValue` checks in observer callback.
       * Setting plain value is a default behavior.
       */
      var attributeHandler;
      if (shouldCopyValue) {
        attributeHandler = function attributeHandler(elem, attr, value) {
          var valueToCopy = elem.getAttribute(value.slice(1, -1));
          if (valueToCopy === null) {
            logMessage(source, "No element attribute found to copy value from: ".concat(value));
          }
          elem.setAttribute(attr, valueToCopy);
        };
      }
      setAttributeBySelector(source, selector, attr, value, attributeHandler);
      observeDOMChanges(function () {
        return setAttributeBySelector(source, selector, attr, value, attributeHandler);
      }, true);
    }