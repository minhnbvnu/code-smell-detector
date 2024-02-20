function execTest(testId, options) {
  return new Promise((resolve, reject) => {
    const baseConfig = merge({
      entry: path.resolve(__dirname, 'scss', `${testId}.scss`),
      output: {
        filename: `${testId}.js`,
      },
      module: {
        rules: [{
          test: /\.scss$/,
          use: [
            { loader: 'raw-loader' },
            {
              loader: pathToLoader,
              options,
            },
          ],
        }],
      },
    });

    runWebpack(baseConfig, (err) => (err ? reject(err) : resolve()));
  });
}