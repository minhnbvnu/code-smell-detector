function ResetSelected() {
  var entry = gPrefView[view.selection.currentIndex];
  gPrefBranch.clearUserPref(entry.prefCol);
}