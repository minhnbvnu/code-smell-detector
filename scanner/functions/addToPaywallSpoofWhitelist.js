function addToPaywallSpoofWhitelist(root) {
  chrome.storage.sync.get(["paywallSpoofWhitelistDict"],
  (result) => {
    updResult = result.paywallSpoofWhitelistDict
    root = "*://*." + root + "/*"

    //Add root to paywallSpoofWhitelistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallSpoofWhitelistDict: updResult
    }, function() {
        paywallSpoofWhitelistDict = updResult;
        console.log("Added " + root + " To Paywall SpoofWhitelist!");
        chrome.tabs.reload();
    });
  });
}