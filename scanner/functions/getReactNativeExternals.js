function getReactNativeExternals(options) {
  return Promise.all(options.platforms.map(
    (platform) => getReactNativeDependencyNames({
      projectRoots: options.projectRoots || [process.cwd()],
      assetRoots: options.assetRoots || [process.cwd()],
      platform: platform,
    })
  )).then((moduleNamesGroupedByPlatform) => {
    const allReactNativeModules = Array.prototype.concat.apply([], moduleNamesGroupedByPlatform);
    return makeWebpackExternalsConfig(allReactNativeModules);
  });
}