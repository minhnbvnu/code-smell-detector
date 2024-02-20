function removeFromPaywallSMWhitelist(root) {
  chrome.storage.sync.get(["paywallSMWhitelistDict"],
  (result) => {
    updResult = result.paywallSMWhitelistDict
    root = "*://*." + root + "/*"

    //Remove root from paywallSMWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallSMWhitelistDict: updResult
      }, function() {
        paywallSMWhitelistDict = updResult;
        console.log("Removed " + root + " From Paywall SMWhitelist!");
        chrome.tabs.reload();
      });
  });
}