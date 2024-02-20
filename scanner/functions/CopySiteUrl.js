function CopySiteUrl() {
  // Copy selected site url to clipboard
  let clipboard = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(
    Ci.nsIClipboardHelper
  );
  let row = signonsTree.currentIndex;
  let url = signonsTreeView.getCellText(row, { id: "siteCol" });
  clipboard.copyString(url);
}