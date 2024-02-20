function FilterPasswords() {
  if (filterField.value == "") {
    SignonClearFilter();
    return;
  }

  let newFilterSet = _filterPasswords(filterField.value, signonsTreeView);
  if (!signonsTreeView._filterSet.length) {
    // Save Display Info for the Non-Filtered mode when we first
    // enter Filtered mode.
    SignonSaveState();
  }
  signonsTreeView._filterSet = newFilterSet;

  // Clear the display
  let oldRowCount = signonsTreeView.rowCount;
  signonsTreeView.rowCount = 0;
  signonsTree.rowCountChanged(0, -oldRowCount);
  // Set up the filtered display
  signonsTreeView.rowCount = signonsTreeView._filterSet.length;
  signonsTree.rowCountChanged(0, signonsTreeView.rowCount);

  // if the view is not empty then select the first item
  if (signonsTreeView.rowCount > 0) {
    signonsTreeView.selection.select(0);
  }

  signonsIntro.textContent = "The following logins match your search:";
  removeAllButton.label = "Remove All Shown";
  removeAllButton.accessKey = "A";
}