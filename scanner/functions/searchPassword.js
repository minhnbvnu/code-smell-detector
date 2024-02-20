function searchPassword(_domain, action = "search", useFillOnSubmit = true) {
  // don't run searches for empty queries or ignored URLs
  _domain = _domain.trim();
  var ignore = ["newtab", "extensions"];
  if (!_domain.length || ignore.indexOf(_domain) >= 0) {
    return;
  }

  searching = true;
  logins = resultLogins = [];
  domain = _domain;
  urlDuringSearch = activeTab.url;
  m.redraw();

  // First get the settings needed by the browserpass native client
  // by requesting them from the background script (which has localStorage access
  // to the settings). Then construct the message to send to browserpass and
  // send that via sendNativeMessage.
  chrome.runtime.sendMessage({ action: "getSettings" }, function(settings) {
    searchSettings = settings;
    chrome.runtime.sendNativeMessage(
      app,
      { action: action, domain: _domain, settings: settings },
      function(response) {
        if (chrome.runtime.lastError) {
          return resetWithError(chrome.runtime.lastError.message);
        }

        if (typeof response == "string") {
          return resetWithError(response);
        }

        searching = false;

        logins = resultLogins = response ? response : [];
        document.getElementById("filter-search").textContent = domain;
        fillOnSubmit = useFillOnSubmit && logins.length > 0;
        if (logins.length > 0) {
          showFilterHint(true);
          document.getElementById("search-field").value = "";
        }
        m.redraw();
      }
    );
  });
}