function polyfillLazyGlobal(name, valueFn, scope = GLOBAL) {
  if (scope[name] !== undefined) {
    const descriptor = Object.getOwnPropertyDescriptor(scope, name);
    const backupName = `original${name[0].toUpperCase()}${name.substr(1)}`;
    Object.defineProperty(scope, backupName, {...descriptor, value: scope[name]});
  }

  Object.defineProperty(scope, name, {
    configurable: true,
    enumerable: true,
    get() {
      return this[name] = valueFn();
    },
    set(value) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        value
      });
    }
  });
}