function DeleteSignon() {
  let syncNeeded = !!signonsTreeView._filterSet.length;
  let tree = signonsTree;
  let view = signonsTreeView;
  let table = GetVisibleLogins();

  // Turn off tree selection notifications during the deletion
  tree.view.selection.selectEventsSuppressed = true;

  // remove selected items from list (by setting them to null) and place in deleted list
  let selections = GetTreeSelections();
  for (let s = selections.length - 1; s >= 0; s--) {
    let i = selections[s];
    deletedSignons.push(table[i]);
    table[i] = null;
  }

  // collapse list by removing all the null entries
  for (let j = 0; j < table.length; j++) {
    if (table[j] == null) {
      let k = j;
      while (k < table.length && table[k] == null) {
        k++;
      }
      table.splice(j, k - j);
      view.rowCount -= k - j;
      tree.rowCountChanged(j, j - k);
    }
  }

  // update selection and/or buttons
  if (table.length) {
    // update selection
    let nextSelection =
      selections[0] < table.length ? selections[0] : table.length - 1;
    tree.view.selection.select(nextSelection);
  } else {
    // disable buttons
    removeButton.setAttribute("disabled", "true");
    removeAllButton.setAttribute("disabled", "true");
  }
  tree.view.selection.selectEventsSuppressed = false;
  FinalizeSignonDeletions(syncNeeded);
}