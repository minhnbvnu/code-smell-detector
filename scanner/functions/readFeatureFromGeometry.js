function readFeatureFromGeometry(
  object,
  arcs,
  scale,
  translate,
  property,
  name,
  options,
) {
  let geometry = null;
  const type = object.type;
  if (type) {
    const geometryReader = GEOMETRY_READERS[type];
    if (type === 'Point' || type === 'MultiPoint') {
      geometry = geometryReader(object, scale, translate);
    } else {
      geometry = geometryReader(object, arcs);
    }
    geometry = transformGeometryWithOptions(geometry, false, options);
  }
  const feature = new Feature({geometry: geometry});
  if (object.id !== undefined) {
    feature.setId(object.id);
  }
  let properties = object.properties;
  if (property) {
    if (!properties) {
      properties = {};
    }
    properties[property] = name;
  }
  if (properties) {
    feature.setProperties(properties, true);
  }
  return feature;
}