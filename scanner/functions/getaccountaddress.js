function getaccountaddress (params, wallet) {
  var labelFilter = filterBy('label', params.label)
  var key = wallet.keys.filter(labelFilter)[0] || wallet.key(params.label)
  if (!key) {
    var secondPassword = getSecondPasswordForWallet(wallet)
    key = wallet.newLegacyAddress(params.label, secondPassword)
  }
  return key.address
}