function createPropertyInitializerDescriptor(prop) {
  return descriptorCache[prop] || (descriptorCache[prop] = {
    configurable: true,
    enumerable: false,
    get: function get() {
      initializeInstance(this); // TODO not safe

      return this[prop];
    },
    set: function set(value) {
      initializeInstance(this); // TODO not safe

      this[prop] = value;
    }
  });
}