function getbalance (params, wallet) {
  var balance = params.account
    ? getAccountKeys(wallet, params.account).map(pluck('balance')).reduce(add, 0)
    : wallet.finalBalance
  return satoshiToBTC(balance)
}