function Runtime(builtins = new Library, global = window_global) {
  const builtin = this.module();
  Object.defineProperties(this, {
    _dirty: {value: new Set},
    _updates: {value: new Set},
    _precomputes: {value: [], writable: true},
    _computing: {value: null, writable: true},
    _init: {value: null, writable: true},
    _modules: {value: new Map},
    _variables: {value: new Set},
    _disposed: {value: false, writable: true},
    _builtin: {value: builtin},
    _global: {value: global}
  });
  if (builtins) for (const name in builtins) {
    (new Variable(TYPE_IMPLICIT, builtin)).define(name, [], builtins[name]);
  }
}