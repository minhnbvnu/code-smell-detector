function loginToClipboard() {
  chrome.runtime.sendMessage(
    { action: "copyToClipboard", entry: this.entry, what: this.what },
    function(response) {
      if (response.error) {
        return resetWithError(response.error);
      }

      copyToClipboard(response.text);
      window.close();
    }
  );
}