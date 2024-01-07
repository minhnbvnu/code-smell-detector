function baseAssign(object, source) {
    return source == null
      ? object
      : baseCopy(source, keys(source), object);
  }