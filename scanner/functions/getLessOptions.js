function getLessOptions(loaderContext, loaderOptions, implementation) {
  const options =
    typeof loaderOptions.lessOptions === "function"
      ? loaderOptions.lessOptions(loaderContext) || {}
      : loaderOptions.lessOptions || {};

  const lessOptions = {
    plugins: [],
    relativeUrls: true,
    // We need to set the filename because otherwise our WebpackFileManager will receive an undefined path for the entry
    filename: loaderContext.resourcePath,
    ...options,
  };

  const plugins = lessOptions.plugins.slice();
  const shouldUseWebpackImporter =
    typeof loaderOptions.webpackImporter === "boolean"
      ? loaderOptions.webpackImporter
      : true;

  if (shouldUseWebpackImporter) {
    plugins.unshift(createWebpackLessPlugin(loaderContext, implementation));
  }

  plugins.unshift({
    install(lessProcessor, pluginManager) {
      // eslint-disable-next-line no-param-reassign
      pluginManager.webpackLoaderContext = loaderContext;

      lessOptions.pluginManager = pluginManager;
    },
  });

  lessOptions.plugins = plugins;

  return lessOptions;
}