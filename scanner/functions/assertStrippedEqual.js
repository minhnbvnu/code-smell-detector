function assertStrippedEqual(code, expected) {
    assert.strictEqual(
      stripCppComments(code),
      expected,
      'Stripped code does not match expectation'
    );
  }