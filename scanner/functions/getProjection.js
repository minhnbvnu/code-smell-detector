function getProjection(image) {
  const geoKeys = image.geoKeys;
  if (!geoKeys) {
    return null;
  }

  if (
    geoKeys.ProjectedCSTypeGeoKey &&
    geoKeys.ProjectedCSTypeGeoKey !== 32767
  ) {
    const code = 'EPSG:' + geoKeys.ProjectedCSTypeGeoKey;
    let projection = getCachedProjection(code);
    if (!projection) {
      const units = unitsFromCode(geoKeys.ProjLinearUnitsGeoKey);
      if (units) {
        projection = new Projection({
          code: code,
          units: units,
        });
      }
    }
    return projection;
  }

  if (geoKeys.GeographicTypeGeoKey && geoKeys.GeographicTypeGeoKey !== 32767) {
    const code = 'EPSG:' + geoKeys.GeographicTypeGeoKey;
    let projection = getCachedProjection(code);
    if (!projection) {
      const units = unitsFromCode(geoKeys.GeogAngularUnitsGeoKey);
      if (units) {
        projection = new Projection({
          code: code,
          units: units,
        });
      }
    }
    return projection;
  }

  return null;
}