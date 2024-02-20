function findNodeAt(node, start, end, test, baseVisitor, state) {
  if (!baseVisitor) {
    baseVisitor = base;
  }

  test = makeTest(test);

  try {
    (function c(node, st, override) {
      var type = override || node.type;

      if ((start == null || node.start <= start) && (end == null || node.end >= end)) {
        baseVisitor[type](node, st, c);
      }

      if ((start == null || node.start === start) && (end == null || node.end === end) && test(type, node)) {
        throw new Found(node, st);
      }
    })(node, state);
  } catch (e) {
    if (e instanceof Found) {
      return e;
    }

    throw e;
  }
}