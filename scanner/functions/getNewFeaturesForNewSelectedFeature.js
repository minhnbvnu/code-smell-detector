function getNewFeaturesForNewSelectedFeature(
  selectedTab,
  selectedFeatures,
  feature
) {
  const setToSelected = !selectedFeatures[feature];
  // logFeatureClickToGa(feature, setToSelected)

  const selectedFeature = {
    ...selectedFeatures,
    [feature]: setToSelected,
  };

  if (
    _.some(
      _.map(
        buildConfigConfig[selectedTab].selectionRules.stopSelectFunctions,
        (fn) => fn(selectedFeature, feature, setToSelected)
      )
    )
  ) {
    return state;
  }

  return _.reduce(
    buildConfigConfig[selectedTab].selectionRules.additionalSelectFunctions,
    (currentSelectionMap, fn) =>
      fn(currentSelectionMap, feature, setToSelected),
    selectedFeature
  );
}