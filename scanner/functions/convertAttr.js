function convertAttr(attr, mapping) {
    var converted = {};

    for (var prop in attr) {
      if (attr.hasOwnProperty(prop)) {
        var visProp = mapping[prop];
        if (Array.isArray(visProp)) {
          visProp.forEach(function (visPropI) {
            setProp(converted, visPropI, attr[prop]);
          });
        } else if (typeof visProp === 'string') {
          setProp(converted, visProp, attr[prop]);
        } else {
          setProp(converted, prop, attr[prop]);
        }
      }
    }

    return converted;
  }