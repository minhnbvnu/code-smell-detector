function getFetchFunction(options, context) {
    const globalOptions = getGlobalLoaderOptions();
    const fetchOptions = options || globalOptions;
    if (typeof fetchOptions.fetch === "function") {
      return fetchOptions.fetch;
    }
    if (isObject(fetchOptions.fetch)) {
      return (url) => fetchFile(url, fetchOptions);
    }
    if (context?.fetch) {
      return context?.fetch;
    }
    return fetchFile;
  }