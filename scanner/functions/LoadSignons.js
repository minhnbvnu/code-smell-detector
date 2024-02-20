function LoadSignons() {
  // loads signons into table
  try {
    signons = Services.logins.getAllLogins();
  } catch (e) {
    signons = [];
  }
  signons.forEach(login => login.QueryInterface(Ci.nsILoginMetaInfo));
  signonsTreeView.rowCount = signons.length;

  // sort and display the table
  signonsTree.view = signonsTreeView;
  // The sort column didn't change. SortTree (called by
  // SignonColumnSort) assumes we want to toggle the sort
  // direction but here we don't so we have to trick it
  lastSignonSortAscending = !lastSignonSortAscending;
  SignonColumnSort(lastSignonSortColumn);

  // disable "remove all signons" button if there are no signons
  if (!signons.length) {
    removeAllButton.setAttribute("disabled", "true");
    togglePasswordsButton.setAttribute("disabled", "true");
  } else {
    removeAllButton.removeAttribute("disabled");
    togglePasswordsButton.removeAttribute("disabled");
  }

  return true;
}