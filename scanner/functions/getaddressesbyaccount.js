function getaddressesbyaccount (params, wallet) {
  return getAccountKeys(wallet, params.label).map(pluck('address'))
}