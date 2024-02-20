function RenderNodeID(id) {
  return (actual) => {
    QUnit.assert.ok(
      typeof actual === 'string',
      'render node id should be a string'
    );

    if (id === undefined) {
      QUnit.assert.ok(
        actual.match(/^.+render-node:.+$/),
        `render node id should have the right format, actual: ${actual}`
      );
    } else {
      QUnit.assert.strictEqual(actual, id, 'render node id should match');
    }
  };
}