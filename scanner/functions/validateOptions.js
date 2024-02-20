function validateOptions(options, loaders) {
    validateOptionsObject(options, null, DEFAULT_LOADER_OPTIONS, REMOVED_LOADER_OPTIONS, loaders);
    for (const loader of loaders) {
      const idOptions = options && options[loader.id] || {};
      const loaderOptions = loader.options && loader.options[loader.id] || {};
      const deprecatedOptions = loader.deprecatedOptions && loader.deprecatedOptions[loader.id] || {};
      validateOptionsObject(idOptions, loader.id, loaderOptions, deprecatedOptions, loaders);
    }
  }