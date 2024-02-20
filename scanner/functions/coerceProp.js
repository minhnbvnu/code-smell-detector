function coerceProp(prop, value) {
    var coerce = prop.options.coerce;
    if (!coerce) {
      return value;
    }
    // coerce is a function
    return coerce(value);
  }