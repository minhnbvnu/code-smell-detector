function normalizeLoader(loader) {
    assert2(loader, "null loader");
    assert2(isLoaderObject(loader), "invalid loader");
    let options;
    if (Array.isArray(loader)) {
      options = loader[1];
      loader = loader[0];
      loader = {
        ...loader,
        options: { ...loader.options, ...options }
      };
    }
    if (loader?.parseTextSync || loader?.parseText) {
      loader.text = true;
    }
    if (!loader.text) {
      loader.binary = true;
    }
    return loader;
  }