function getNearestIndexOfPref(pref) {
  var low = -1,
    high = gPrefArray.length;
  var index = (low + high) >> 1;
  while (index > low) {
    if (gSortFunction(gPrefArray[index], pref) < 0) {
      low = index;
    } else {
      high = index;
    }
    index = (low + high) >> 1;
  }
  return high;
}