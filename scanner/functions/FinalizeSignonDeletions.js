function FinalizeSignonDeletions(syncNeeded) {
  for (let s = 0; s < deletedSignons.length; s++) {
    Services.logins.removeLogin(deletedSignons[s]);
    Services.telemetry.getHistogramById("PWMGR_MANAGE_DELETED").add(1);
    Services.obs.notifyObservers(
      null,
      "weave:telemetry:histogram",
      "PWMGR_MANAGE_DELETED"
    );
  }
  // If the deletion has been performed in a filtered view, reflect the deletion in the unfiltered table.
  // See bug 405389.
  if (syncNeeded) {
    try {
      signons = Services.logins.getAllLogins();
    } catch (e) {
      signons = [];
    }
  }
  deletedSignons.length = 0;
}