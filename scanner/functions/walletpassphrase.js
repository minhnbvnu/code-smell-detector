function walletpassphrase (params, wallet) {
  if (!wallet.isDoubleEncrypted) {
    throw 'Error: running with an unencrypted wallet, but walletpassphrase was used'
  }
  if (!wallet.validateSecondPassword(params.password)) {
    throw 'The wallet passphrase entered was incorrect.'
  }
  secondPasswordStore.set(wallet.guid, params.password, params.timeout)
  return true
}