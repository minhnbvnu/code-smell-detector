function cTypes(identifier) {
    return contains(basicCTypes, identifier) || /.+_t$/.test(identifier);
  }