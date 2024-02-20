function findNodeAfter(node, pos, test, baseVisitor, state) {
  test = makeTest(test);

  if (!baseVisitor) {
    baseVisitor = base;
  }

  try {
    (function c(node, st, override) {
      if (node.end < pos) {
        return;
      }

      var type = override || node.type;

      if (node.start >= pos && test(type, node)) {
        throw new Found(node, st);
      }

      baseVisitor[type](node, st, c);
    })(node, state);
  } catch (e) {
    if (e instanceof Found) {
      return e;
    }

    throw e;
  }
}