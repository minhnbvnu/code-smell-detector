function removeEslintIfTypscript(
  allFeatureStates,
  affectedFeature,
  setToSelected
) {
  const toTypescript = affectedFeature === 'typescript' && setToSelected;

  return {
    ...allFeatureStates,
    eslint: toTypescript ? false : allFeatureStates.eslint,
  };
}