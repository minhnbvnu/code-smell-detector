function toFeature(renderFeature, geometryName) {
  const id = renderFeature.getId();
  const geometry = toGeometry(renderFeature);
  const properties = renderFeature.getProperties();
  const feature = new Feature();
  if (geometryName !== undefined) {
    feature.setGeometryName(geometryName);
  }
  feature.setGeometry(geometry);
  if (id !== undefined) {
    feature.setId(id);
  }
  feature.setProperties(properties, true);
  return feature;
}