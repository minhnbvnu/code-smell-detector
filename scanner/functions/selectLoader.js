async function selectLoader(data, loaders = [], options, context) {
    if (!validHTTPResponse(data)) {
      return null;
    }
    let loader = selectLoaderSync(data, loaders, { ...options, nothrow: true }, context);
    if (loader) {
      return loader;
    }
    if (isBlob(data)) {
      data = await data.slice(0, 10).arrayBuffer();
      loader = selectLoaderSync(data, loaders, options, context);
    }
    if (!loader && !options?.nothrow) {
      throw new Error(getNoValidLoaderMessage(data));
    }
    return loader;
  }