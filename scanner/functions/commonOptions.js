function commonOptions(program) {
  return program
    .option(
      '-H, --hostname [hostname]',
      'Hostname on which the server will listen. [localhost]',
      'localhost'
    )
    .option(
      '-P, --port [port]',
      'Port on which the server will listen. [8080]',
      8080
    )
    .option(
      '-p, --packagerPort [port]',
      'Port on which the react-native packager will listen. [8081]',
      8081
    )
    .option(
      '-w, --webpackPort [port]',
      'Port on which the webpack dev server will listen. [8082]',
      8082
    )
    .option(
      '-c, --webpackConfigPath [path]',
      'Path to the webpack configuration file. [webpack.config.js]',
      'webpack.config.js'
    )
    .option(
      '--no-android',
      'Disable support for Android. [false]',
      false
    )
    .option(
      '--no-ios',
      'Disable support for iOS. [false]',
      false
    )
    .option(
      '-A, --androidEntry [name]',
      'Android entry module name. Has no effect if \'--no-android\' is passed. [index.android]',
      'index.android'
    )
    .option(
      '-I, --iosEntry [name]',
      'iOS entry module name. Has no effect if \'--no-ios\' is passed. [index.ios]',
      'index.ios'
    )
    .option(
      '--projectRoots [projectRoots]',
      'List of comma-separated paths for the react-native packager to consider as project root directories',
      null
    )
    .option(
      '--root [root]',
      'List of comma-separated paths for the react-native packager to consider as additional directories. If provided, these paths must include react-native and its dependencies.',
      null
    )
    .option(
      '--assetRoots [assetRoots]',
      'List of comma-separated paths for the react-native packager to consider as asset root directories',
      null
    )
    .option(
      '-r, --resetCache',
      'Remove cached react-native packager files [false]',
      false
    )
    .option(
      '--hasteExternals',
      // React Native 0.23 rewrites `require('HasteModule')` calls to
      // `require(42)` where 42 is an internal module id. That breaks
      // treating Haste modules simply as commonjs modules and leaving
      // the `require()` call in the source. So for now this feature
      // only works with React Native <0.23.
      'Allow direct import of React Native\'s (<0.23) internal Haste modules [false]',
      false
    );
}