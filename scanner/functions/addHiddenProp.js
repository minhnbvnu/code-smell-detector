function addHiddenProp(object, propName, value) {
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: value
  });
}