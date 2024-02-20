function _removeFromScope() {
  const bindings = this.getBindingIdentifiers();
  Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
}