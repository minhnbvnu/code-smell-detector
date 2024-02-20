function testValuesAreGreaterThan(keyName, val) {
    for (var index in functions) {
      if (!(functions[index][keyName] > val)) {
        t.fail("Value of '" + keyName + "' should be greater than " + val + ' (' + functions[index][keyName] + ')');
        return;
      }
    }
    t.pass("Value of '" + keyName + "' is greater than " + val + ' for all functions');
  }