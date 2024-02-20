function getFacetStatsIfAvailable(facetList, facetName) {
  var data = find(facetList, {name: facetName});
  return data && data.stats;
}