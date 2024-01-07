function clusterHullStyle(cluster) {
  if (cluster !== hoverFeature) {
    return null;
  }
  const originalFeatures = cluster.get('features');
  const points = originalFeatures.map((feature) =>
    feature.getGeometry().getCoordinates(),
  );
  return new Style({
    geometry: new Polygon([monotoneChainConvexHull(points)]),
    fill: convexHullFill,
    stroke: convexHullStroke,
  });
}