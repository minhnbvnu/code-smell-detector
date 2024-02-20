function getViewIndexOfPref(pref) {
  var low = -1,
    high = gPrefView.length;
  var index = (low + high) >> 1;
  while (index > low) {
    var mid = gPrefView[index];
    if (mid == pref) {
      return index;
    }
    if (gSortFunction(mid, pref) < 0) {
      low = index;
    } else {
      high = index;
    }
    index = (low + high) >> 1;
  }
  return -1;
}