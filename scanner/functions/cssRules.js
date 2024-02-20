function cssRules() {
  return {
    name: 'CSS',
    group: 'Styling',
    devDependencies: configItems =>
      _.concat(['css-loader'], getStyleLoaderDependencyIfNeeded(configItems)),
    webpack: (webpackConfig, configItems) => {
      const isPostCss = _.includes(configItems, 'postcss');
      const cssLoader = isPostCss
        ? {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          }
        : 'css-loader';
      const rule = {
        test: /\.css$/,
        use: _.concat(
          [getStyleLoader(configItems), cssLoader],
          isPostCss ? 'postcss-loader' : []
        ),
      };
      if (_.includes(configItems, 'css-modules')) {
        rule.exclude = /\.module\.css$/;
      }
      return addModuleRule(webpackConfig, rule);
    },
    files: configItems => {
      const isVue = _.includes(configItems, 'vue');
      const isSvelte = _.includes(configItems, 'svelte');
      if (isVue || isSvelte) {
        return {};
      }
      const isTailwindcss = _.includes(configItems, 'tailwind-css');
      return {
        'src/styles.css': isTailwindcss
          ? tailwindcss({ withPostCSS: true })
          : css,
      };
    },
  };
}