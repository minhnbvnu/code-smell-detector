function assertPragmasFound(code, expected) {
    assert.deepEqual(findXodPragmas(code), expected);
  }