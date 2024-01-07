function renderGeometryCollectionGeometry(
  replayGroup,
  geometry,
  style,
  feature,
  declutterBuilderGroup,
) {
  const geometries = geometry.getGeometriesArray();
  let i, ii;
  for (i = 0, ii = geometries.length; i < ii; ++i) {
    const geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
    geometryRenderer(
      replayGroup,
      geometries[i],
      style,
      feature,
      declutterBuilderGroup,
    );
  }
}