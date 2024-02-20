function listreceivedbyaccount (params, wallet) {
  var accountMap = wallet.keys
    .map(function (key) {
      return { amount: key.totalReceived, address: key.address, account: key.label }
    })
    .reduce(function (acc, key) {
      var account = acc[key.account] || { amount: 0, addresses: [], label: key.account, account: key.account }
      account.addresses.push(key.address)
      account.amount += key.amount
      acc[key.account] = account
      return acc
    }, {})
  return Object.keys(accountMap)
    .map(function (key) {
      var keyObj = accountMap[key]
      keyObj.addresses = '[' + keyObj.addresses.join(', ') + ']'
      keyObj.amount = satoshiToBTC(keyObj.amount)
      return keyObj
    })
    .filter(function (key) { return key.amount !== 0 || params.includeempty })
}