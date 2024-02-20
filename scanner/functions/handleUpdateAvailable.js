function handleUpdateAvailable(details) {
    console.log("Update Available: " + details.version);
    // Proceed to upgrade the add-on
    chrome.runtime.reload();
  }