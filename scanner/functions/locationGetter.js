function locationGetter(property) {
  return function() {
    return this[property];
  };
}