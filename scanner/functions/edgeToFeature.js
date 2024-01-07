function edgeToFeature(edge) {
  const feature = new Feature({
    geometry: new LineString(edge.coordinates),
    edge: edge,
  });
  feature.setId(edge.id);
  edges.addFeature(feature);
}