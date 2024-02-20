function removeFromPaywallCookieWhitelist(root) {
  chrome.storage.sync.get(["paywallCookieWhitelistDict"],
  (result) => {
    updResult = result.paywallCookieWhitelistDict
    root = "*://*." + root + "/*"
    //Remove root from paywallCookieWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallCookieWhitelistDict: updResult
      }, function() {
        paywallCookieWhitelistDict = updResult;
        console.log("Removed " + root + " From Paywall CookieWhitelist!");
        chrome.tabs.reload();
      });
  });
}