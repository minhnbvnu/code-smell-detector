function addOrRemoveReactHotLoader(
  allFeatureStates,
  affectedFeature,
  setToSelected
) {
  let setReactHotLoader;

  if (
    (affectedFeature === 'vue' ||
      affectedFeature === 'svelte' ||
      affectedFeature === 'no-library') &&
    setToSelected
  ) {
    setReactHotLoader = false;
  }

  if (affectedFeature === 'react') {
    if (setToSelected) {
      setReactHotLoader = true;
    } else {
      setReactHotLoader = false;
    }
  }
  if (setReactHotLoader === undefined) {
    return allFeatureStates;
  }
  return {
    ...allFeatureStates,
    'react-hot-loader': setReactHotLoader,
  };
}