function makeHotConfig(webpackConfig) {
  webpackConfig.plugins = webpackConfig.plugins || [];
  webpackConfig.plugins.unshift(
    new webpack.BannerPlugin(
      'if (typeof navigator.userAgent === \'undefined\') {\n' +
      '  throw new Error(\'Hot module replacement only works with RCTWebSocketExecutor; use Cmd + D, "Debug in Chrome"\')' +
      '}\n',
      {raw: true, entryOnly: true}
    )
  );
}