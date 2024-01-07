function nodeToFeature(node) {
  const feature = new Feature({
    geometry: new Point(node.coordinate),
    node: node,
  });
  feature.setId(node.id);
  nodes.addFeature(feature);
}