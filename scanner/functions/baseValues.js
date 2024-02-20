function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }