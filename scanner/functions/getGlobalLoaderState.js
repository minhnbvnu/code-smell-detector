function getGlobalLoaderState() {
    globalThis.loaders = globalThis.loaders || {};
    const { loaders } = globalThis;
    loaders._state = loaders._state || {};
    return loaders._state;
  }