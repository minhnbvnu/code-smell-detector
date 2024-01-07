function getTraceTargets(coordinate, features) {
  /**
   * @type {Array<TraceTarget>}
   */
  const targets = [];

  for (let i = 0; i < features.length; ++i) {
    const feature = features[i];
    const geometry = feature.getGeometry();
    appendGeometryTraceTargets(coordinate, geometry, targets);
  }

  return targets;
}