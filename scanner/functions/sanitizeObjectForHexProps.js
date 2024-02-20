function sanitizeObjectForHexProps (stateObject) {
      Tweenable.each(stateObject, function (prop) {
        var currentProp = stateObject[prop];

        if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
          stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
        }
      });
    }