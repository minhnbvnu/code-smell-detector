async function TogglePasswordVisible() {
  if (showingPasswords || (await masterPasswordLogin(AskUserShowPasswords))) {
    showingPasswords = !showingPasswords;
    togglePasswordsButton.label = showingPasswords ? "Hide Passwords" : "Show Passwords";
    togglePasswordsButton.accessKey = "P";
    document.getElementById("passwordCol").hidden = !showingPasswords;
    FilterPasswords();
  }

  // Notify observers that the password visibility toggling is
  // completed.  (Mostly useful for tests)
  Services.obs.notifyObservers(null, "passwordmgr-password-toggle-complete");
  Services.telemetry
    .getHistogramById("PWMGR_MANAGE_VISIBILITY_TOGGLED")
    .add(showingPasswords);
  Services.obs.notifyObservers(
    null,
    "weave:telemetry:histogram",
    "PWMGR_MANAGE_VISIBILITY_TOGGLED"
  );
}