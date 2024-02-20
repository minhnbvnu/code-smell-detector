function getRefinement(state, type, attributeName, name, resultsFacets) {
  var facet = find(resultsFacets, {name: attributeName});
  var count = get(facet, 'data[' + name + ']');
  var exhaustive = get(facet, 'exhaustive');
  return {
    type: type,
    attributeName: attributeName,
    name: name,
    count: count || 0,
    exhaustive: exhaustive || false
  };
}