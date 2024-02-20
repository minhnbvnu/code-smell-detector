function addExpectedEvent(method) {
  //	console.log('Adding expected call to method: ' + method);
  if (!expectedProbeCounts[method]) {
    expectedProbeCounts[method] = 0;
    actualProbeCounts[method] = 0;
  }
  expectedProbeCounts[method]++;
  //	console.log('Expected calls to method: ' + method + ' now '
  //			+ expectedProbeCounts[method]);
}