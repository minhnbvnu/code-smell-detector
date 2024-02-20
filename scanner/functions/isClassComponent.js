function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }