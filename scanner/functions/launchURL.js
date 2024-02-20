function launchURL(event) {
  var openInNewTab = event.shiftKey;

  chrome.runtime.sendMessage(
    { action: "launch", entry: this.entry, openInNewTab: openInNewTab },
    function(response) {
      if (response.error) {
        return resetWithError(response.error);
      }
      window.close();
    }
  );
}