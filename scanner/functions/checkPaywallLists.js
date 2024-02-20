function checkPaywallLists(root) {
  rootSearch = "*://*." + root + "/*"
  if(root !== "failed") {
    paywallInSMWhitelist =  (rootSearch in paywallSMWhitelistDict)
    paywallInSpoofWhitelist =  (rootSearch in paywallSpoofWhitelistDict)
    paywallInBlacklist = (rootSearch in paywallBlacklistDict)
    paywallEnabled =  (rootSearch in paywallBlacklistDict)
    paywallInCookieWhitelist = (rootSearch in paywallCookieWhitelistDict)
    console.log("paywallEnabled: " + paywallEnabled)
  }
}