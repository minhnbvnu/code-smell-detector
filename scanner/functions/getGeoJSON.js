function getGeoJSON (type) {
  return JSON.parse(JSON.stringify(features[type]));
}