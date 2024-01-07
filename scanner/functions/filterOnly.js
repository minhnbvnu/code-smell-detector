function filterOnly(suite) {
  if (suite._onlyTests.length) {
    // If the suite contains `only` tests, run those and ignore any nested suites.
    suite.tests = suite._onlyTests;
    suite.suites = [];
  } else {
    // Otherwise, do not run any of the tests in this suite.
    suite.tests = [];
    suite._onlySuites.forEach(function(onlySuite) {
      // If there are other `only` tests/suites nested in the current `only` suite, then filter that `only` suite.
      // Otherwise, all of the tests on this `only` suite should be run, so don't filter it.
      if (hasOnly(onlySuite)) {
        filterOnly(onlySuite);
      }
    });
    // Run the `only` suites, as well as any other suites that have `only` tests/suites as descendants.
    suite.suites = suite.suites.filter(function(childSuite) {
      return (
        suite._onlySuites.indexOf(childSuite) !== -1 || filterOnly(childSuite)
      );
    });
  }
  // Keep the suite only if there is something to run
  return suite.tests.length || suite.suites.length;
}