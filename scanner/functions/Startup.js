function Startup() {
  // be prepared to reload the display if anything changes
  Services.obs.addObserver(signonReloadDisplay, "passwordmgr-storage-changed");

  signonsTree = document.getElementById("signonsTree");
  filterField = document.getElementById("filter");
  togglePasswordsButton = document.getElementById("togglePasswords");
  signonsIntro = document.getElementById("signonsIntro");
  removeButton = document.getElementById("removeSignon");
  removeAllButton = document.getElementById("removeAllSignons");

  togglePasswordsButton.label = "Show Passwords";
  togglePasswordsButton.accessKey = "P";
  signonsIntro.textContent = "Logins for the following sites are stored on your computer";
  removeAllButton.label = "Remove All";
  removeAllButton.accessKey = "A";

  if (Services.policies && !Services.policies.isAllowed("passwordReveal")) {
    togglePasswordsButton.hidden = true;
  }

  document
    .getElementsByTagName("treecols")[0]
    .addEventListener("click", event => {
      let { target, button } = event;
      let sortField = target.getAttribute("data-field-name");

      if (target.nodeName != "treecol" || button != 0 || !sortField) {
        return;
      }

      SignonColumnSort(sortField);
      Services.telemetry
        .getKeyedHistogramById("PWMGR_MANAGE_SORTED")
        .add(sortField);
    });

  LoadSignons();

  // filter the table if requested by caller
  if (
    window.arguments &&
    window.arguments[0] &&
    window.arguments[0].filterString
  ) {
    setFilter(window.arguments[0].filterString);
  }

  FocusFilterBox();
}