function closeTabs(tabIds) {
  bg.recordTabsRemoved(tabIds, function() {
    for (var x = 0; x < tabIds.length; x++) {
      var tabId = tabIds[x];
      chrome.tabs.remove(tabId);
      $("#" + tabId).fadeOut("fast").remove();
    }
    $('.closed').remove();
  })
}