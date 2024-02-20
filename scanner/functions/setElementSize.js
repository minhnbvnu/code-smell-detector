function setElementSize(el, size, gutSize) {
      // Split.js allows setting sizes via numbers (ideally), or if you must,
      // by string, like '300px'. This is less than ideal, because it breaks
      // the fluid layout that `calc(% - px)` provides. You're on your own if you do that,
      // make sure you calculate the gutter size by hand.
      var style = elementStyle(dimension, size, gutSize);

      // eslint-disable-next-line no-param-reassign
      Object.keys(style).forEach(function(prop) {
        return (el.style[prop] = style[prop]);
      });
    }