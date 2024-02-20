function isLoaderObject(loader) {
    if (!loader) {
      return false;
    }
    if (Array.isArray(loader)) {
      loader = loader[0];
    }
    const hasExtensions = Array.isArray(loader?.extensions);
    return hasExtensions;
  }