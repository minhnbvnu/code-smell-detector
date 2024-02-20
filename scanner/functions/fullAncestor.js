function fullAncestor(node, callback, baseVisitor, state) {
  if (!baseVisitor) {
    baseVisitor = base;
  }

  var ancestors = [];

  (function c(node, st, override) {
    var type = override || node.type;
    var isNew = node !== ancestors[ancestors.length - 1];

    if (isNew) {
      ancestors.push(node);
    }

    baseVisitor[type](node, st, c);

    if (!override) {
      callback(node, st || ancestors, ancestors, type);
    }

    if (isNew) {
      ancestors.pop();
    }
  })(node, state);
}