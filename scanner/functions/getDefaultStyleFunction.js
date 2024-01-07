function getDefaultStyleFunction() {
  const styles = createEditingStyle();
  extend(styles['Polygon'], styles['LineString']);
  extend(styles['GeometryCollection'], styles['LineString']);

  return function (feature) {
    if (!feature.getGeometry()) {
      return null;
    }
    return styles[feature.getGeometry().getType()];
  };
}