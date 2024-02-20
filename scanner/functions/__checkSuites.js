function __checkSuites(context, suites) {
  for (const key in suites) {
    const suite = suites[key];
    // check if disable
    if (!context.disabledSuites[key]) {
      context.suites[key] = suite;
    } else {
      // disabledModules
      for (const moduleName of suite.modules) {
        context.disabledModules[moduleName] = true;
      }
    }
  }
}