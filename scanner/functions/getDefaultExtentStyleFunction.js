function getDefaultExtentStyleFunction() {
  const style = createEditingStyle();
  return function (feature, resolution) {
    return style['Polygon'];
  };
}