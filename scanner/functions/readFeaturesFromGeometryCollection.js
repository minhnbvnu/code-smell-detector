function readFeaturesFromGeometryCollection(
  collection,
  arcs,
  scale,
  translate,
  property,
  name,
  options,
) {
  const geometries = collection['geometries'];
  const features = [];
  for (let i = 0, ii = geometries.length; i < ii; ++i) {
    features[i] = readFeatureFromGeometry(
      geometries[i],
      arcs,
      scale,
      translate,
      property,
      name,
      options,
    );
  }
  return features;
}