function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }