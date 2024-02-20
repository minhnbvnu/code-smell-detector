function unpackClass(Class) {
  return function(value) {
    return new Class(value);
  };
}