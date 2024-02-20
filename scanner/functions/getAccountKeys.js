function getAccountKeys (wallet, account) {
  return helpers.isBitcoinAddress(account)
    ? [wallet.key(account)]
    : wallet.keys.filter(filterBy('label', account))
}