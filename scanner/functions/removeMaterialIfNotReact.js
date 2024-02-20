function removeMaterialIfNotReact(
  allFeatureStates,
  affectedFeature,
  setToSelected
) {
  if (
    (affectedFeature === 'vue' ||
      affectedFeature === 'svelte' ||
      affectedFeature === 'no-library') &&
    setToSelected
  ) {
    return {
      ...allFeatureStates,
      'material-ui': false,
    };
  }
  return allFeatureStates;
}