function setDefaultPaywallLists(details) {
  if (details.reason === 'install') {
      chrome.storage.sync.set({
        paywallSMWhitelistDict: paywallSMWhitelistDict,
        paywallSpoofWhitelistDict: paywallSpoofWhitelistDict,
        paywallBlacklistDict: paywallBlacklistDict,
        paywallCookieWhitelistDict: paywallCookieWhitelistDict
      })
  }
}