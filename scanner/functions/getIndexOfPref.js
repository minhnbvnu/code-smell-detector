function getIndexOfPref(pref) {
  var low = -1,
    high = gPrefArray.length;
  var index = (low + high) >> 1;
  while (index > low) {
    var mid = gPrefArray[index];
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
  return index;
}