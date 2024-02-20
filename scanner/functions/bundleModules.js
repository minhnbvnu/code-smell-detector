async function bundleModules(buildId) {
  console.log('Bundling modules...');

  const webpackConfig = getAppWebpackConfig({
    path: getBuildPath(),
    filename: `main-${buildId}.js`,
    mode: 'production'
  });

  await runWebpackCompiler(webpackConfig);
}