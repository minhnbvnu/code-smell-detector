function accept(id, factory, inverseDependencies) {
    var mod = modules[id];

    if (!mod) {
      define(id, factory);
      return true; // new modules don't need to be accepted
    }

    if (!mod.module.hot) {
      console.warn(
        'Cannot accept module because Hot Module Replacement ' +
        'API was not installed.'
      );
      return false;
    }

    // replace and initialize factory
    if (factory) {
      mod.factory = factory;
    }
    mod.isInitialized = false;
    require(id);

    if (mod.module.hot.acceptCallback) {
      mod.module.hot.acceptCallback();
      return true;
    } else {
      // need to have inverseDependencies to bubble up accept
      if (!inverseDependencies) {
        throw new Error('Undefined `inverseDependencies`');
      }

      // accept parent modules recursively up until all siblings are accepted
      return acceptAll(inverseDependencies[id], inverseDependencies);
    }
  }