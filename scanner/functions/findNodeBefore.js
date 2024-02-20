function findNodeBefore(node, pos, test, baseVisitor, state) {
  test = makeTest(test);

  if (!baseVisitor) {
    baseVisitor = base;
  }

  var max;

  (function c(node, st, override) {
    if (node.start > pos) {
      return;
    }

    var type = override || node.type;

    if (node.end <= pos && (!max || max.node.end < node.end) && test(type, node)) {
      max = new Found(node, st);
    }

    baseVisitor[type](node, st, c);
  })(node, state);

  return max;
}