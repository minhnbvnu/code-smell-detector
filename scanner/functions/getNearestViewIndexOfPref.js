function getNearestViewIndexOfPref(pref) {
  var low = -1,
    high = gPrefView.length;
  var index = (low + high) >> 1;
  while (index > low) {
    if (gSortFunction(gPrefView[index], pref) < 0) {
      low = index;
    } else {
      high = index;
    }
    index = (low + high) >> 1;
  }
  return high;
}