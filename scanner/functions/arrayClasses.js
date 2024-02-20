function arrayClasses(classVal) {
      var classes = [];
      if (isArray(classVal)) {
        forEach(classVal, function(v) {
          classes = classes.concat(arrayClasses(v));
        });
        return classes;
      } else if (isString(classVal)) {
        return classVal.split(' ');
      } else if (isObject(classVal)) {
        forEach(classVal, function(v, k) {
          if (v) {
            classes = classes.concat(k.split(' '));
          }
        });
        return classes;
      }
      return classVal;
    }