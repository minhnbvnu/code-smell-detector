function getSecondPasswordForWallet (wallet) {
  var pass = secondPasswordStore.get(wallet.guid)
  if (wallet.isDoubleEncrypted && !pass) throw 'Second Password Expired'
  return pass
}