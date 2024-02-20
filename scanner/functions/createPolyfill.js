function createPolyfill(id, dependencies) {
    var polyfill = new Polyfill({});
    polyfill.getName = jest.fn(() => Promise.resolve(id));
    polyfill.getDependencies =
      jest.fn(() => Promise.resolve(dependencies));
    return polyfill;
  }