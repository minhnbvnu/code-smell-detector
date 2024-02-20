function updateObjects(streamName, features) {
  for (const feature of features) {
    const xvizObject = XVIZObject.get(feature.id);
    if (xvizObject) {
      xvizObject._addFeature(streamName, feature);
    }
  }
}