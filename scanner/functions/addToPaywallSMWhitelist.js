function addToPaywallSMWhitelist(root) {
  chrome.storage.sync.get(["paywallSMWhitelistDict"],
  (result) => {
    updResult = result.paywallSMWhitelistDict
    root = "*://*." + root + "/*"

    //Add root to paywallSMWhitelistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallSMWhitelistDict: updResult
    }, function() {
        paywallSMWhitelistDict = updResult;
        console.log("Added " + root + " To Paywall SMWhitelist!");
        chrome.tabs.reload();
    });
  });
}