function assertSpreadProperty(node, opts) {
  console.trace("The node type SpreadProperty has been renamed to SpreadElement");
  assert("SpreadProperty", node, opts);
}