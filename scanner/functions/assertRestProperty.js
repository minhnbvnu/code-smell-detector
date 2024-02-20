function assertRestProperty(node, opts) {
  console.trace("The node type RestProperty has been renamed to RestElement");
  assert("RestProperty", node, opts);
}