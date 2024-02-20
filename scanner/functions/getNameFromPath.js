function getNameFromPath(filepath) {
  filepath = removeExtName(filepath);
  if (filepath === 'LayoutPropTypes') {
    return 'Flexbox';
  } else if (filepath === 'TransformPropTypes') {
    return 'Transforms';
  } else if (filepath === 'TabBarItemIOS') {
    return 'TabBarIOS.Item';
  } else if (filepath === 'AnimatedImplementation') {
    return 'Animated';
  }
  return filepath;
}