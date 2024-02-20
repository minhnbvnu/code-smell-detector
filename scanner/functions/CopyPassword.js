async function CopyPassword() {
  // Don't copy passwords if we aren't already showing the passwords & a master
  // password hasn't been entered.
  if (!showingPasswords && !(await masterPasswordLogin())) {
    return;
  }
  // Copy selected signon's password to clipboard
  let clipboard = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(
    Ci.nsIClipboardHelper
  );
  let row = signonsTree.currentIndex;
  let password = signonsTreeView.getCellText(row, { id: "passwordCol" });
  clipboard.copyString(password);
  Services.telemetry.getHistogramById("PWMGR_MANAGE_COPIED_PASSWORD").add(1);
  Services.obs.notifyObservers(
    null,
    "weave:telemetry:histogram",
    "PWMGR_MANAGE_COPIED_PASSWORD"
  );
}