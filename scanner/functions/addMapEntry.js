function addMapEntry(map, pair) {
  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}