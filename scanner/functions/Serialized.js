function Serialized(id) {
  return (actual) => {
    QUnit.assert.ok(
      typeof actual === 'object' && actual !== null,
      'serialized object should be an object'
    );
    QUnit.assert.ok(
      typeof actual.id === 'string',
      'serialized object should have a string id'
    );

    if (id === undefined) {
      QUnit.assert.ok(
        actual.id.match(/^ember[0-9]+$/),
        'serialized object should have an ember guid'
      );
    } else {
      QUnit.assert.strictEqual(
        actual.id,
        id,
        'serialized object should have an ember guid'
      );
    }
  };
}