function _getElements(input) {
      var elements;
      if (typeof input === 'string' || input instanceof String) {
        // See https://davidwalsh.name/nodelist-array for the technique transforming nodeList -> Array.
        elements = [].slice.call(document.querySelectorAll(input));
        // I checked the 'input instanceof NodeList' test in IE9 and modern browsers and it worked for me.
      } else if (Array.isArray(input) || input instanceof NodeList) {
        elements = [].slice.call(input);
      } else {
        throw new Error('The selector provided to AnchorJS was invalid.');
      }
      return elements;
    }