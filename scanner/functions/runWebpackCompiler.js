function runWebpackCompiler(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    // Webpack error handling: https://webpack.js.org/api/node/#error-handling
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.hasErrors()) {
        stats.toJson().errors.map(error => {
          console.log(error);
        });
        reject(new Error('webpack compilation failed'));
      } else {
        resolve(stats);
      }
    });
  });
}