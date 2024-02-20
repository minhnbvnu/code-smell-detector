function getaccount (params, wallet) {
  var key = wallet.key(params.bitcoinAddress)
  if (!key) throw 'Address not found'
  if (!key.label) throw 'Address is not in an account'
  return key.label
}