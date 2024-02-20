function addEdgeToMap(map, v, e) {
  (map[v] || (map[v] = new Set())).add(e);
}