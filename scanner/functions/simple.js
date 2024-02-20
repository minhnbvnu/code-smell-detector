function simple(node, visitors, baseVisitor, state, override) {
  if (!baseVisitor) {
    baseVisitor = base;
  }

  (function c(node, st, override) {
    var type = override || node.type,
        found = visitors[type];
    baseVisitor[type](node, st, c);

    if (found) {
      found(node, st);
    }
  })(node, state, override);
}