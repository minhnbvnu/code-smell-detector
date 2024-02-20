function genericOnClick(info) {
    if (info.menuItemId !== 'inspect-ember-component') return;
    void chrome.tabs.sendMessage(activeTabId, {
      from: 'devtools',
      type: 'view:contextMenu'
    });
  }