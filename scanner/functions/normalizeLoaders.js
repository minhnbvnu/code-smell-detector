function normalizeLoaders(loaders) {
    for (const loader of loaders) {
      normalizeLoader(loader);
    }
  }