function updateTabAction(tabId) {
    chrome.storage.sync.get("options", async function(data) {
      void chrome.action.enable(tabId);
      void chrome.action.setIcon({
        tabId,
        path: {
          19: '{{PANE_ROOT}}/assets/images/icon19.png',
          38: '{{PANE_ROOT}}/assets/images/icon38.png',
        }
      });
      setActionTitle(tabId);
    });
  }