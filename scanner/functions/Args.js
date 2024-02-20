function Args({ names = [], positionals = 0 } = {}) {
  return (actual) => {
    QUnit.assert.ok(
      typeof actual === 'object' && actual !== null,
      'serialized args should be an object'
    );

    QUnit.assert.ok(
      actual !== null && !actual.named.__ARGS__,
      'serialized named args should not have __ARGS__'
    );

    QUnit.assert.ok(
      typeof actual.named === 'object' && actual !== null,
      'serialized named args should be an object'
    );
    QUnit.assert.deepEqual(
      Object.keys(actual.named),
      names,
      'serialized named args should have the right keys'
    );

    QUnit.assert.ok(
      Array.isArray(actual.positional),
      'serialized positional args should be an array'
    );
    QUnit.assert.strictEqual(
      actual.positional.length,
      positionals,
      'serialized positional args should have the right number of items'
    );
  };
}