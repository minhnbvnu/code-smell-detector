function setaccount (params, wallet) {
  var key = wallet.key(params.bitcoinAddress)
  if (!key) throw 'Address not found'
  key.label = params.label
  return key.label === params.label
}