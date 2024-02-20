function formatHierarchicalFacetValue(hierarchicalSeparator, currentRefinement) {
  return function format(facetCount, facetValue) {
    return {
      name: trim(last(facetValue.split(hierarchicalSeparator))),
      path: facetValue,
      count: facetCount,
      isRefined: currentRefinement === facetValue || currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
      data: null
    };
  };
}