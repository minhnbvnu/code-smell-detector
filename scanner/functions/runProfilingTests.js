function runProfilingTests(profData, t) {
  var functions = profData['functions'];

  t.ok(isInteger(profData.time), 'Timestamp is an integer');
  t.ok(
    isReasonableTimestamp(parseInt(profData.time, 10)),
    'Timestamp is a reasonable value (expected to contain current year)'
  );

  testValuesAreIntegers('self');
  testValuesAreIntegers('parent');
  testValuesAreIntegers('line');
  testValuesAreIntegers('count');

  // Parse values of all functions for next tests
  for (var currentFunction in functions) {
    for (var entry in currentFunction) {
      if (entry != 'file' || entry != 'name') currentFunction[entry] = parseInt(currentFunction[entry], 10);
    }
  }

  testValuesAreGreaterThan('self', 0); // Self can't be 0 as the root can't be a function
  testValuesAreGreaterThan('parent', -1);
  testValuesAreGreaterThan('line', -1);
  testValuesAreGreaterThan('count', -1);

  // Check the same key for all functions in data are integer
  function testValuesAreIntegers(keyName) {
    for (var index in functions) {
      if (!isInteger(functions[index][keyName])) {
        t.fail('Value of ' + keyName + ' should be an integer (' + functions[index][keyName] + ')');
        return;
      }
    }
    t.pass("Value of '" + keyName + "' is an integer for all functions");
  }

  function testValuesAreGreaterThan(keyName, val) {
    for (var index in functions) {
      if (!(functions[index][keyName] > val)) {
        t.fail("Value of '" + keyName + "' should be greater than " + val + ' (' + functions[index][keyName] + ')');
        return;
      }
    }
    t.pass("Value of '" + keyName + "' is greater than " + val + ' for all functions');
  }
}