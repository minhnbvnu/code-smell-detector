function injectGlobalSnapShot(suite, depth) {
  suite.suites.forEach(suite => injectGlobalSnapShot(suite, depth +1));
  if (!suite.root) {
    suite._beforeAll.unshift(suite._createHook('Global snapshot', globalSnapShot));
  }
}