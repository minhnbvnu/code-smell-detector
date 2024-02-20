function loadWebpackConfig () {
  var webpackConfig = require('./webpack.config.js');
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.module.preLoaders = [
    {
      test: /\.jsx?$/,
      include: path.resolve('lib'),
      loader: 'isparta'
    }
  ];
  return webpackConfig;
}