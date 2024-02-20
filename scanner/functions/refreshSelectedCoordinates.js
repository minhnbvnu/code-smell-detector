function refreshSelectedCoordinates(store, options) {
  const newSelectedCoordinates = store._selectedCoordinates.filter(point => store._selectedFeatureIds.has(point.feature_id));
  if (store._selectedCoordinates.length !== newSelectedCoordinates.length && !options.silent) {
    store._emitSelectionChange = true;
  }
  store._selectedCoordinates = newSelectedCoordinates;
}