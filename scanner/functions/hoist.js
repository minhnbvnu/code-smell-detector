function hoist(scope = this.scope) {
  const hoister = new _hoister.default(this, scope);
  return hoister.run();
}