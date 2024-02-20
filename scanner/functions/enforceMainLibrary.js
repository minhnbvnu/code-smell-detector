function enforceMainLibrary(allFeatureStates, affectedFeature, setToSelected) {
  // Deselect React if user picks Vue
  if (affectedFeature === 'vue' && setToSelected) {
    return {
      ...allFeatureStates,
      react: !setToSelected,
      svelte: !setToSelected,
      'no-library': !setToSelected,
    };
    // deselect vue if user selects react
  } else if (affectedFeature === 'react' && setToSelected) {
    return {
      ...allFeatureStates,
      vue: !setToSelected,
      svelte: !setToSelected,
      'no-library': !setToSelected,
    };
  } else if (affectedFeature === 'svelte' && setToSelected) {
    return {
      ...allFeatureStates,
      vue: !setToSelected,
      react: !setToSelected,
      'no-library': !setToSelected,
    };
  } else if (affectedFeature === 'no-library' && setToSelected) {
    return {
      ...allFeatureStates,
      vue: !setToSelected,
      react: !setToSelected,
      svelte: !setToSelected,
    };
  }

  return allFeatureStates;
}