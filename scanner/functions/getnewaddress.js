function getnewaddress (params, wallet) {
  var pass = getSecondPasswordForWallet(wallet)
  var key = wallet.newLegacyAddress(params.label, pass)
  return key.address
}