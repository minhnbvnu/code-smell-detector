function stopIfNotBabelOrTypescriptForReact(
  allFeatureStates,
  affectedFeature,
  setToSelected
) {
  // if user tries to deselect babel, and react is set and typescript is not set, then don't allow it
  if (
    affectedFeature === 'babel' &&
    !setToSelected &&
    allFeatureStates.react &&
    !allFeatureStates.typescript
  ) {
    return true;
  }
  if (
    affectedFeature === 'typescript' &&
    !setToSelected &&
    allFeatureStates.react &&
    !allFeatureStates.babel
  ) {
    return true;
  }
  return false;
  //
}