function getAccountAddresses (wallet, account) {
  return helpers.isBitcoinAddress(account)
    ? [account]
    : wallet.keys.filter(filterBy('label', account)).map(pluck('address'))
}