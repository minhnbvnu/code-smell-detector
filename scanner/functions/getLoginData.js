function getLoginData() {
  searching = true;
  logins = resultLogins = [];
  m.redraw();

  chrome.runtime.sendMessage(
    { action: "login", entry: this, urlDuringSearch: urlDuringSearch },
    function(response) {
      if (response.error) {
        return resetWithError(response.error);
      }
      window.close();
    }
  );
}