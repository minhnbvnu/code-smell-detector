function walletlock (params, wallet) {
  secondPasswordStore.remove(wallet.guid)
  return true
}