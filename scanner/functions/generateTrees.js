function generateTrees(state) {
  return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
    var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
    var hierarchicalFacetRefinement = state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
      state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0] || '';
    var hierarchicalSeparator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
    var hierarchicalRootPath = state._getHierarchicalRootPath(hierarchicalFacet);
    var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(hierarchicalFacet);
    var sortBy = prepareHierarchicalFacetSortBy(state._getHierarchicalFacetSortBy(hierarchicalFacet));

    var generateTreeFn = generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath,
      hierarchicalShowParentLevel, hierarchicalFacetRefinement);

    var results = hierarchicalFacetResult;

    if (hierarchicalRootPath) {
      results = hierarchicalFacetResult.slice(hierarchicalRootPath.split(hierarchicalSeparator).length);
    }

    return reduce(results, generateTreeFn, {
      name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
      count: null, // root level, no count
      isRefined: true, // root level, always refined
      path: null, // root level, no path
      data: null
    });
  };
}