function babelLoader(userDefinedBabelConfig) {
  return {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [[require('@skpm/babel-preset')]],
        ...(userDefinedBabelConfig || {}),
      },
    },
  }
}