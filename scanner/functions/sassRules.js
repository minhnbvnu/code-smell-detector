function sassRules() {
  return {
    name: 'Sass',
    group: 'Styling',
    devDependencies: configItems =>
      _.concat(
        ['css-loader', 'sass-loader', 'node-sass'],
        getStyleLoaderDependencyIfNeeded(configItems)
      ),
    webpack: (webpackConfig, configItems) =>
      addModuleRule(webpackConfig, {
        test: /\.scss$/,
        use: [getStyleLoader(configItems), 'css-loader', 'sass-loader'],
      }),
    files: configItems => {
      const isVue = _.includes(configItems, 'vue');
      const isSvelte = _.includes(configItems, 'svelte');
      if (isVue || isSvelte) {
        return {};
      }
      return { 'src/styles.scss': scss };
    },
  };
}