function SignonClearFilter() {
  let singleSelection = signonsTreeView.selection.count == 1;

  // Clear the Tree Display
  signonsTreeView.rowCount = 0;
  signonsTree.rowCountChanged(0, -signonsTreeView._filterSet.length);
  signonsTreeView._filterSet = [];

  // Just reload the list to make sure deletions are respected
  LoadSignons();

  // Restore selection
  if (singleSelection) {
    signonsTreeView.selection.clearSelection();
    for (let i = 0; i < signonsTreeView._lastSelectedRanges.length; ++i) {
      let range = signonsTreeView._lastSelectedRanges[i];
      signonsTreeView.selection.rangedSelect(range.min, range.max, true);
    }
  } else {
    signonsTreeView.selection.select(0);
  }
  signonsTreeView._lastSelectedRanges = [];

  signonsIntro.textContent = "Logins for the following sites are stored on your computer";
  removeAllButton.label = "Remove All";
  removeAllButton.accessKey = "A";
}