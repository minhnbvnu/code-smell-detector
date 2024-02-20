function cssModulesRules() {
  return {
    name: 'CSS Modules',
    group: 'Styling',
    devDependencies: configItems =>
      _.concat(['css-loader'], getStyleLoaderDependencyIfNeeded(configItems)),
    webpack: (webpackConfig, configItems) => {
      const isPostCss = _.includes(configItems, 'postcss');
      const rule = {
        test: /\.css$/,
        use: _.concat(
          [
            getStyleLoader(configItems),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          isPostCss ? 'postcss-loader' : []
        ),
      };
      if (_.includes(configItems, 'css')) {
        rule.include = /\.module\.css$/;
      }
      return addModuleRule(webpackConfig, rule);
    },
  };
}