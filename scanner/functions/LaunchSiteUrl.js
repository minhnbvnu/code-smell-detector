function LaunchSiteUrl() {
  let row = signonsTree.currentIndex;
  let url = signonsTreeView.getCellText(row, { id: "siteCol" });
  window.openWebLinkIn(url, "tab");
}