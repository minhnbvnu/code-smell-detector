function assertRequirePragmasFound(code, expected) {
    assert.sameMembers(findRequireUrls(code), expected);
  }