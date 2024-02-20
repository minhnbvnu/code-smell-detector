function hideAction(tabId) {
    if (!activeTabs[tabId]) {
      return;
    }

    void chrome.action.disable(tabId);
    void chrome.action.setIcon({
      tabId,
      path: {
        19: '{{PANE_ROOT}}/assets/images/icon19_grey.png',
        38: '{{PANE_ROOT}}/assets/images/icon38_grey.png',
      }
    });
  }