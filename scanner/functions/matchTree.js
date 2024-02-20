function matchTree(tree, matchers, name) {
  QUnit.assert.strictEqual(
    tree.length,
    matchers.length,
    `${name} tree and matcher should have the same length`
  );

  for (let i = 0; i < matchers.length; i++) {
    match(tree[i], matchers[i]);
  }
}