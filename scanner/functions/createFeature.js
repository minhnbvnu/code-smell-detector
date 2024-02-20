function createFeature(featureType) {
  const feature = xtend({
    id: hatRack(),
    properties: {}
  }, getGeoJSON(featureType));
  feature.toGeoJSON = () => feature;
  feature.setProperty = (property, name) => { feature.properties[property] = name; };
  return feature;
}