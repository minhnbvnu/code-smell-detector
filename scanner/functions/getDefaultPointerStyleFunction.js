function getDefaultPointerStyleFunction() {
  const style = createEditingStyle();
  return function (feature, resolution) {
    return style['Point'];
  };
}