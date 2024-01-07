function renderGeometry(replayGroup, geometry, style, feature) {
  if (geometry.getType() == 'GeometryCollection') {
    const geometries =
      /** @type {import("../geom/GeometryCollection.js").default} */ (
        geometry
      ).getGeometries();
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      renderGeometry(replayGroup, geometries[i], style, feature);
    }
    return;
  }
  const replay = replayGroup.getBuilder(style.getZIndex(), 'Default');
  replay.drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */ (geometry),
    feature,
    style.getRenderer(),
    style.getHitDetectionRenderer(),
  );
}