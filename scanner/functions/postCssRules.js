function postCssRules() {
  return {
    name: 'PostCSS',
    group: 'Styling',
    devDependencies: configItems => ['postcss-loader', 'autoprefixer'],
    files: configItems => {
      const isTailwindcss = _.includes(configItems, 'tailwind-css');
      return { 'postcss.config.js': postCssConfig(isTailwindcss) };
    },
  };
}