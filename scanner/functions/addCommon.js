function addCommon() {
  // Add transformations that don't alter coordinates to convert within set of
  // projections with equal meaning.
  addEquivalentProjections(EPSG3857_PROJECTIONS);
  addEquivalentProjections(EPSG4326_PROJECTIONS);
  // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
  // coordinates and back.
  addEquivalentTransforms(
    EPSG4326_PROJECTIONS,
    EPSG3857_PROJECTIONS,
    fromEPSG4326,
    toEPSG4326,
  );
}