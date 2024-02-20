function installProxy(tabId) {
  if (IS_FIREFOX) {
    chrome.tabs.executeScript(tabId, {
      file: '/rbuild/proxy.js'
    }, function () {});
  } else {
    chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      files: ['/rbuild/proxy.js']
    });
  }
}