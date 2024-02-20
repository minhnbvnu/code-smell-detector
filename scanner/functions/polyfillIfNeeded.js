function polyfillIfNeeded(name, polyfill, scope = GLOBAL, descriptor = {}) {
  if (scope[name] === undefined) {
    Object.defineProperty(scope, name, {...descriptor, value: polyfill});
  }
}