function getStyleTags(configItems) {
  const isCss = _.includes(configItems, 'css');
  const isLess = _.includes(configItems, 'less');
  const isSass = _.includes(configItems, 'sass');
  const isStylus = _.includes(configItems, 'stylus');
  const isTailwindCSS = _.includes(configItems, 'tailwind-css');
  const cssStyle = `<style>
${css}
</style>`;
  const lessStyle = `<style lang="less">
${less}
</style>`;
  const sassStyle = `<style lang="scss">
${scss}
</style>`;
  const stylusStyle = `<style lang="styl">
${stylus}
</style>`;
  const tailwindcssStyle = `<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>`;

  return _.concat(
    [],
    isCss && !isTailwindCSS ? cssStyle : [],
    isSass ? sassStyle : [],
    isLess ? lessStyle : [],
    isStylus ? stylusStyle : [],
    isTailwindCSS ? tailwindcssStyle : []
  );
}