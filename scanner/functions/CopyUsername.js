function CopyUsername() {
  // Copy selected signon's username to clipboard
  let clipboard = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(
    Ci.nsIClipboardHelper
  );
  let row = signonsTree.currentIndex;
  let username = signonsTreeView.getCellText(row, { id: "userCol" });
  clipboard.copyString(username);
  Services.telemetry.getHistogramById("PWMGR_MANAGE_COPIED_USERNAME").add(1);
  Services.obs.notifyObservers(
    null,
    "weave:telemetry:histogram",
    "PWMGR_MANAGE_COPIED_USERNAME"
  );
}