function getFeaturesForNewTab(newTab, selectedFeatures) {
  const newAllPossibleFeatures = _.keys(
    buildConfigConfig[newTab].featureConfig.features
  );

  let shouldSetNoLibrary = selectedFeatures['no-library'];

  if (newTab === 'parcel' && selectedFeatures.svelte) {
    // Svelte was selected when switching to the parcel tab
    // which isn't supported so we set the flag shouldSetNoLibrary to
    // true so main library switches to "no-library"
    shouldSetNoLibrary = true;
  }

  const filteredFeatures = _.mapValues(
    selectedFeatures,
    (selected, feature) =>
      _.includes(newAllPossibleFeatures, feature) && selected
  );

  let shouldSetBabel = filteredFeatures.babel;
  if ((newTab === 'webpack' || newTab === 'parcel') && selectedFeatures.react) {
    // React was selected when switching to the webpack tab
    // if we come from snowpack, then babel is not set.
    // it must be set if React should work properly
    shouldSetBabel = true;
  }

  if (
    newTab === 'snowpack' &&
    (selectedFeatures.vue || selectedFeatures.svelte)
  ) {
    // if we select snowpack, and vue was selected, then we must select no lib
    shouldSetNoLibrary = true;
  }

  return {
    ...filteredFeatures,
    babel: shouldSetBabel,
    'no-library': shouldSetNoLibrary,
  };
}