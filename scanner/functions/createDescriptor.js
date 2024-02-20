function createDescriptor(type, props, children) {
  var args = Array.prototype.slice.call(arguments, 1);
  return type.apply(null, args);
}