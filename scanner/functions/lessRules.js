function lessRules() {
  return {
    name: 'Less',
    group: 'Styling',
    devDependencies: configItems =>
      _.concat(
        ['css-loader', 'less-loader', 'less'],
        getStyleLoaderDependencyIfNeeded(configItems)
      ),
    webpack: (webpackConfig, configItems) =>
      addModuleRule(webpackConfig, {
        test: /\.less$/,
        use: [getStyleLoader(configItems), 'css-loader', 'less-loader'],
      }),
    files: configItems => {
      const isVue = _.includes(configItems, 'vue');
      const isSvelte = _.includes(configItems, 'svelte');
      if (isVue || isSvelte) {
        return {};
      }
      return { 'src/styles.less': less };
    },
  };
}