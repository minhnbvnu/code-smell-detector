function setDefaultAdblockWhitelist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      adblockWhitelistDict: {}
    })
  }
  adblockWhitelistDict = {}
}