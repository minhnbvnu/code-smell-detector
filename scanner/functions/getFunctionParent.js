function getFunctionParent() {
  return this.findParent(p => p.isFunction());
}