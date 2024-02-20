function checkAdblockWhiteList(root) {
  console.log("Checking if " + root + " is in adblockWhitelist...")
  if(root !== "failed")
    adblockInWhitelist =  (root in adblockWhitelistDict)
}