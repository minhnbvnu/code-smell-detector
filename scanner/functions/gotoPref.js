function gotoPref(pref) {
  // make sure the pref exists and is displayed in the current view
  var index = pref in gPrefHash ? getViewIndexOfPref(gPrefHash[pref]) : -1;
  if (index >= 0) {
    view.selection.select(index);
    view.treebox.ensureRowIsVisible(index);
  } else {
    view.selection.clearSelection();
    view.selection.currentIndex = -1;
  }
}