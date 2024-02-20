function normalizeOptionsInternal(loader, options, url) {
    const loaderDefaultOptions = loader.options || {};
    const mergedOptions = { ...loaderDefaultOptions };
    addUrlOptions(mergedOptions, url);
    if (mergedOptions.log === null) {
      mergedOptions.log = new NullLog();
    }
    mergeNestedFields(mergedOptions, getGlobalLoaderOptions());
    mergeNestedFields(mergedOptions, options);
    return mergedOptions;
  }