function setGutterSize(gutterElement, gutSize) {
      var style = gutterStyle(dimension, gutSize);

      // eslint-disable-next-line no-param-reassign
      Object.keys(style).forEach(function(prop) {
        return (gutterElement.style[prop] = style[prop]);
      });
    }