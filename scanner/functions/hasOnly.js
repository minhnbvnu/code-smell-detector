function hasOnly(suite) {
  return (
    suite._onlyTests.length ||
    suite._onlySuites.length ||
    suite.suites.some(hasOnly)
  );
}