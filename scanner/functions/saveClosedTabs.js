function saveClosedTabs() {
  if (getClosedTabsListSave()) {
    // save closedTabs after a delay to avoid saving all tabs on browser exit
    setTimeout(function () {
      localStorage["closed_tabs"] = JSON.stringify(closedTabs);
    }, 10000);
  }
}