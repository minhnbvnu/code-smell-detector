function setActionTitle(tabId) {
    void chrome.action.setTitle({
      tabId: tabId,
      title: generateVersionsTooltip(activeTabs[tabId])
    });
  }