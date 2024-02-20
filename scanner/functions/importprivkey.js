function importprivkey (params, wallet) {
  var pass = getSecondPasswordForWallet(wallet)
  return wallet.importLegacyAddress(params.privateKey, null, pass)
    .then(function (key) { return true })
    .catch(function (e) { return e === 'presentInWallet' })
}