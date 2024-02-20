function toLookup(arr) {
  return arr.reduce(function(lookup, name, index) {
    lookup[name] = index;

    return lookup;
  }, {});
}