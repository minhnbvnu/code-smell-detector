async function DeleteAllSignons() {
  // Confirm the user wants to remove all passwords
  let dummy = { value: false };
  if (
    Services.prompt.confirmEx(
      window,
      "Remove all passwords",
      "Are you sure you wish to remove all passwords?",
      Services.prompt.STD_YES_NO_BUTTONS + Services.prompt.BUTTON_POS_1_DEFAULT,
      null,
      null,
      null,
      null,
      dummy
    ) == 1
  ) {
    // 1 == "No" button
    return;
  }

  let syncNeeded = !!signonsTreeView._filterSet.length;
  let view = signonsTreeView;
  let table = GetVisibleLogins();

  // remove all items from table and place in deleted table
  for (let i = 0; i < table.length; i++) {
    deletedSignons.push(table[i]);
  }
  table.length = 0;

  // clear out selections
  view.selection.select(-1);

  // update the tree view and notify the tree
  view.rowCount = 0;

  signonsTree.rowCountChanged(0, -deletedSignons.length);
  signonsTree.invalidate();

  // disable buttons
  removeButton.setAttribute("disabled", "true");
  removeAllButton.setAttribute("disabled", "true");
  FinalizeSignonDeletions(syncNeeded);
  Services.telemetry.getHistogramById("PWMGR_MANAGE_DELETED_ALL").add(1);
  Services.obs.notifyObservers(
    null,
    "weave:telemetry:histogram",
    "PWMGR_MANAGE_DELETED_ALL"
  );
}