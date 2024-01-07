function removeElementFeature(source, element) {
  const feature = source.getFeatureById(element.id);
  source.removeFeature(feature);
}