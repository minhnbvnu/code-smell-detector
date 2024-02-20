function lowestCost(costs) {
  var record = Infinity;
  var lowest;
  // This is like a "foreach" loop
  for (node in costs) {
    if (costs[node] < record && !processed[node]) {
      record = costs[node];
      lowest = node;
    }
  }
  return lowest;
}