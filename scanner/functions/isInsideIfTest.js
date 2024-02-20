function isInsideIfTest(node) {
  if (node.parent && node.parent.type === 'IfStatement') {
    return node === node.parent.test;
  }
  // we don't check further than great parent since it's "expensive" and we
  // consider it as an edge case (you probably should not have too much logic
  // inside the "test")
  var greatParent = node.parent && node.parent.parent;
  return greatParent && greatParent.type === 'IfStatement' &&
    node.parent === greatParent.test;
}