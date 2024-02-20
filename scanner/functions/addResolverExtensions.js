function addResolverExtensions(webpackConfig, extOrExts, alias) {
  const isManyExtensions = _.isArray(extOrExts);
  const extensions = isManyExtensions ? extOrExts : [extOrExts];

  if (!_.has(webpackConfig, 'resolve')) {
    return {
      ...webpackConfig,
      resolve: {
        extensions,
        ...(_.isEmpty(alias) ? {} : { alias }),
      },
    };
  }

  const newWebpackConfig = _.cloneDeep(webpackConfig);
  newWebpackConfig.resolve.extensions = _.union(
    newWebpackConfig.resolve.extensions,
    extensions
  );

  return newWebpackConfig;
}