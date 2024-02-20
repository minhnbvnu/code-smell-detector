function addToPaywallBlacklist(root) {
  chrome.storage.sync.get(["paywallBlacklistDict"],
  (result) => {
    updResult = result.paywallBlacklistDict
    root = "*://*." + root + "/*"

    //Add root to paywallBlacklistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallBlacklistDict: updResult
    }, function() {
        paywallBlacklistDict = updResult;
        console.log("Added " + root + " To Paywall Blacklist!");
        chrome.tabs.reload();
    });
  });
}