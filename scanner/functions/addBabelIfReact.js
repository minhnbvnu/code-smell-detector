function addBabelIfReact(allFeatureStates, affectedFeature, setToSelected) {
  const forceBabel = allFeatureStates.react && !allFeatureStates.Typescript;

  return {
    ...allFeatureStates,
    babel: forceBabel || allFeatureStates.babel,
  };
}