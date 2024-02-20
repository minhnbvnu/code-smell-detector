function translateText(tab) {
  browser.tabs.sendMessage(tab.id, {
    message: "translateSelectedText"
  });
}