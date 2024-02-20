function listaccounts (params, wallet) {
  return wallet.keys.reduce(function (acc, key) {
    acc[key.address] = satoshiToBTC(key.balance)
    return acc
  }, {})
}