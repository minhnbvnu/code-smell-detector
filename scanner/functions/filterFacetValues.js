function filterFacetValues(parentPath, currentRefinement, hierarchicalSeparator, hierarchicalRootPath,
                           hierarchicalShowParentLevel) {
  return function(facetCount, facetValue) {
    // we want the facetValue is a child of hierarchicalRootPath
    if (hierarchicalRootPath &&
      (facetValue.indexOf(hierarchicalRootPath) !== 0 || hierarchicalRootPath === facetValue)) {
      return false;
    }

    // we always want root levels (only when there is no prefix path)
    return !hierarchicalRootPath && facetValue.indexOf(hierarchicalSeparator) === -1 ||
      // if there is a rootPath, being root level mean 1 level under rootPath
      hierarchicalRootPath &&
      facetValue.split(hierarchicalSeparator).length - hierarchicalRootPath.split(hierarchicalSeparator).length === 1 ||
      // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      facetValue.indexOf(hierarchicalSeparator) === -1 &&
      currentRefinement.indexOf(hierarchicalSeparator) === -1 ||
      // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 ||
      // facetValue is a child of the current parent, add it
      facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
      (hierarchicalShowParentLevel || facetValue.indexOf(currentRefinement) === 0);
  };
}