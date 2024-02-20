function searchFromPivot(matchingSet, order, pivot, dir) {
  var i;

  for (i = pivot; i >= 0 && i < order.length; i += dir) {
    if (matchingSet[order[i]]) {
      return matchingSet[order[i]];
    }
  }

  for (i = pivot; i >= 0 && i < order.length; i -= dir) {
    if (matchingSet[order[i]]) {
      return matchingSet[order[i]];
    }
  }
}