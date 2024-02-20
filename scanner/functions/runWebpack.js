function runWebpack(baseConfig, done) {
  const webpackConfig = merge({
    output: {
      path: path.join(__dirname, 'output'),
      libraryTarget: 'commonjs2',
    },
    mode: 'production',
  }, baseConfig);

  webpack(webpackConfig, (webpackErr, stats) => {
    const err = webpackErr
      || (stats.hasErrors() && stats.compilation.errors[0])
      || (stats.hasWarnings() && stats.compilation.warnings[0]);

    done(err || null);
  });
}