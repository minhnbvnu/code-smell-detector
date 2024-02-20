function removeFromPaywallSpoofWhitelist(root) {
  chrome.storage.sync.get(["paywallSpoofWhitelistDict"],
  (result) => {
    updResult = result.paywallSpoofWhitelistDict
    root = "*://*." + root + "/*"

    //Remove root from paywallSpoofWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallSpoofWhitelistDict: updResult
      }, function() {
        paywallSpoofWhitelistDict = updResult;
        console.log("Removed " + root + " From Paywall SpoofWhitelist!");
        chrome.tabs.reload();
      });
  });
}