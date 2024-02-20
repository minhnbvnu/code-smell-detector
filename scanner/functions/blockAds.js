function blockAds(details) {
  console.log("adblockEnabled: " + adblockEnabled + " adblockInWhitelist: " + adblockInWhitelist)
  if (!adblockEnabled || adblockInWhitelist)
    return
  //console.log("I am going to block:", details.url)
  blockedCount += 1
  return {cancel: true}
}