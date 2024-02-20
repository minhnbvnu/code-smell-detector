function ModifySelected() {
  if (view.selection.currentIndex >= 0) {
    ModifyPref(gPrefView[view.selection.currentIndex]);
  }
}