function selectLoaderSync(data, loaders = [], options, context) {
    if (!validHTTPResponse(data)) {
      return null;
    }
    if (loaders && !Array.isArray(loaders)) {
      return normalizeLoader(loaders);
    }
    let candidateLoaders = [];
    if (loaders) {
      candidateLoaders = candidateLoaders.concat(loaders);
    }
    if (!options?.ignoreRegisteredLoaders) {
      candidateLoaders.push(...getRegisteredLoaders());
    }
    normalizeLoaders(candidateLoaders);
    const loader = selectLoaderInternal(data, candidateLoaders, options, context);
    if (!loader && !options?.nothrow) {
      throw new Error(getNoValidLoaderMessage(data));
    }
    return loader;
  }