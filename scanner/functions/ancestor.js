function ancestor(node, visitors, baseVisitor, state) {
  var ancestors = [];

  if (!baseVisitor) {
    baseVisitor = base;
  }

  (function c(node, st, override) {
    var type = override || node.type,
        found = visitors[type];
    var isNew = node !== ancestors[ancestors.length - 1];

    if (isNew) {
      ancestors.push(node);
    }

    baseVisitor[type](node, st, c);

    if (found) {
      found(node, st || ancestors, ancestors);
    }

    if (isNew) {
      ancestors.pop();
    }
  })(node, state);
}