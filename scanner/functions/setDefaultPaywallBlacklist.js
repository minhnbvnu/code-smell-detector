function setDefaultPaywallBlacklist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      paywallBlacklistDict: paywallBlacklistDict
    })
  }
}