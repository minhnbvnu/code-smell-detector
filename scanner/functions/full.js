function full(node, callback, baseVisitor, state, override) {
  if (!baseVisitor) {
    baseVisitor = base;
  }

  (function c(node, st, override) {
    var type = override || node.type;
    baseVisitor[type](node, st, c);

    if (!override) {
      callback(node, st, type);
    }
  })(node, state, override);
}