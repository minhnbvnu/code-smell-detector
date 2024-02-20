function addToAdblockWhitelist(root) {
  chrome.storage.sync.get(["adblockWhitelistDict"],
  (result) => {
    updResult = result.adblockWhitelistDict
    console.log("root: " + root);

    //Add root to adblockWhitelistDict
    updResult[root] = '1'

    chrome.storage.sync.set({
       adblockWhitelistDict: updResult
    }, function() {
        adblockWhitelistDict = updResult
        adblockInWhitelist = true
        adblockEnabled = false
        console.log("Added " + root + " To Adblock Whitelist!");
    });
  });
}