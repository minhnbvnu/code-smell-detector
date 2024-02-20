function parseFilterList() {
  var filters = [];
  while (!eof()) {
    filters.push(parseFilter());
  }
  return filters;
}