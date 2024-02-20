function variable_resolve(name) {
  return this._shadow?.get(name) ?? this._module._resolve(name);
}