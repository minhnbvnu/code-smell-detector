function findNodeAround(node, pos, test, baseVisitor, state) {
  test = makeTest(test);

  if (!baseVisitor) {
    baseVisitor = base;
  }

  try {
    (function c(node, st, override) {
      var type = override || node.type;

      if (node.start > pos || node.end < pos) {
        return;
      }

      baseVisitor[type](node, st, c);

      if (test(type, node)) {
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