function removeFromPaywallBlacklist(root)  {
  chrome.storage.sync.get(["paywallBlacklistDict"],
  (result) => {
    updResult = result.paywallBlacklistDict
    root = "*://*." + root + "/*"

    console.log("Deleting " + root + "from Paywall Blacklist")
    //Remove root from paywallBlacklistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallBlacklistDict: updResult
      }, function() {
        paywallBlacklistDict = updResult;
        console.log("Removed " + root + " From Paywall Blacklist!");
        chrome.tabs.reload();
      });
  });
}