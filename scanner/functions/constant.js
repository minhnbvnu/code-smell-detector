function constant(name, value) {
    assertNotHasOwnProperty(name, 'constant');
    providerCache[name] = value;
    instanceCache[name] = value;
  }