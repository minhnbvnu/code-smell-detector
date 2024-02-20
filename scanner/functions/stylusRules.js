function stylusRules() {
  return {
    name: 'stylus',
    group: 'Styling',
    devDependencies: configItems =>
      _.concat(
        ['css-loader', 'stylus-loader', 'stylus'],
        getStyleLoaderDependencyIfNeeded(configItems)
      ),
    webpack: (webpackConfig, configItems) =>
      addModuleRule(webpackConfig, {
        test: /\.styl$/,
        use: [getStyleLoader(configItems), 'css-loader', 'stylus-loader'],
      }),
    files: configItems => {
      const isVue = _.includes(configItems, 'vue');
      const isSvelte = _.includes(configItems, 'svelte');
      if (isVue || isSvelte) {
        return {};
      }
      return { 'src/styles.styl': stylus };
    },
  };
}