function testDataAgainstText(data, loader) {
    if (loader.testText) {
      return loader.testText(data);
    }
    const tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
    return tests.some((test) => data.startsWith(test));
  }