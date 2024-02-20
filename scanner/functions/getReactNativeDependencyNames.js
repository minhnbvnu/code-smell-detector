function getReactNativeDependencyNames(options) {
  const blacklist = require('react-native/packager/blacklist');
  const ReactPackager = require('react-native/packager/react-packager');
  const rnEntryPoint = require.resolve('react-native');

  return ReactPackager.getDependencies({
    blacklistRE: blacklist(false /* don't blacklist any platform */),
    projectRoots: options.projectRoots,
    assetRoots: options.assetRoots,
    transformModulePath: require.resolve('react-native/packager/transformer'),
  }, {
    entryFile: rnEntryPoint,
    dev: true,
    platform: options.platform,
  }).then(dependencies =>
    dependencies.filter(dependency => !dependency.isPolyfill())
  ).then(dependencies =>
    Promise.all(dependencies.map(dependency => dependency.getName()))
  );
}