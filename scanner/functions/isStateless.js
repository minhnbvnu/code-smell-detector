function isStateless($filter, filterName) {
  var fn = $filter(filterName);
  return !fn.$stateful;
}