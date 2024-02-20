function testValuesAreIntegers(keyName) {
    for (var index in functions) {
      if (!isInteger(functions[index][keyName])) {
        t.fail('Value of ' + keyName + ' should be an integer (' + functions[index][keyName] + ')');
        return;
      }
    }
    t.pass("Value of '" + keyName + "' is an integer for all functions");
  }