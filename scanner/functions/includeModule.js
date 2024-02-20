function includeModule(klass, module) {
  Object.getOwnPropertyNames(module).forEach(function (name) {
    Object.defineProperty(klass, name, Object.getPropertyDescriptor(module, name));
  });
  return klass;
}