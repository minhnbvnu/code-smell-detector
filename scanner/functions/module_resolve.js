function module_resolve(name) {
  let variable = this._scope.get(name), value;
  if (!variable) {
    variable = new Variable(TYPE_IMPLICIT, this);
    if (this._builtins.has(name)) {
      variable.define(name, constant(this._builtins.get(name)));
    } else if (this._runtime._builtin._scope.has(name)) {
      variable.import(name, this._runtime._builtin);
    } else {
      try {
        value = this._runtime._global(name);
      } catch (error) {
        return variable.define(name, rethrow(error));
      }
      if (value === undefined) {
        this._scope.set(variable._name = name, variable);
      } else {
        variable.define(name, constant(value));
      }
    }
  }
  return variable;
}