function openInNewTab(url) {
  log("opening new tab", url);
  chrome.tabs.create({url: url, index: 1000});
  return closeWindow();
}