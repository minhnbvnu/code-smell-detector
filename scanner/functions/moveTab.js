function moveTab(tab) {
  if(!tab.pinned) {
    if (moveLeftOnSwitch()) {
      log("moving tab to the left", tab.id);
      chrome.tabs.move(tab.id, {index: 0});
    } else if (moveRightOnSwitch()) {
      log("moving tab to the right", tab.id);
      chrome.tabs.move(tab.id, {index: -1});
    }
  }
}