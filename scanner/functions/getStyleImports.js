function getStyleImports(configItems) {
  const isCss = _.includes(configItems, 'css');
  const isSass = _.includes(configItems, 'sass');
  const isLess = _.includes(configItems, 'less');
  const isStylus = _.includes(configItems, 'stylus');
  return _.concat(
    [],
    isCss ? [`import "./styles.css";`] : [],
    isSass ? [`import "./styles.scss";`] : [],
    isLess ? [`import "./styles.less";`] : [],
    isStylus ? [`import "./styles.styl";`] : []
  );
}