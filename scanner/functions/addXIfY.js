function addXIfY(x, y) {
  return function (allFeatureStates, affectedFeature, setToSelected) {
    return {
      ...allFeatureStates,
      [x]: affectedFeature === y && setToSelected ? true : allFeatureStates[x],
    };
  };
}