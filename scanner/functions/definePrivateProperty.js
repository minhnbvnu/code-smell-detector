function definePrivateProperty(object, property, value) {
  Object.defineProperty(object, property, {
    value: value
  });
}