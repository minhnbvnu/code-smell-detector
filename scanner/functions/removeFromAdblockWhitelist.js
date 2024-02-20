function removeFromAdblockWhitelist(root) {
  chrome.storage.sync.get(["adblockWhitelistDict"],
  (result) => {
    updResult = result.adblockWhitelistDict
    console.log("root: " + root);

    //Remove root from adblockWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
       adblockWhitelistDict: updResult
    }, function() {
        adblockWhitelistDict = updResult
        adblockInWhitelist = false
        adblockEnabled = true
        console.log("Removed " + root + " From Adblock Whitelist!");
    });
  });
}