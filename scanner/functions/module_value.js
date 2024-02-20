async function module_value(name) {
  let v = this._scope.get(name);
  if (!v) throw new RuntimeError(`${name} is not defined`);
  if (v._observer === no_observer) {
    v = this.variable(true).define([name], identity);
    try {
      return await module_revalue(this._runtime, v);
    } finally {
      v.delete();
    }
  } else {
    return module_revalue(this._runtime, v);
  }
}