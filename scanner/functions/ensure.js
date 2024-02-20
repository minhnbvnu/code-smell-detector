function ensure(obj, name, factory) {
    return obj[name] || (obj[name] = factory());
  }