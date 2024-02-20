function listreceivedbyaddress (params, wallet) {
  return wallet.keys
    .map(function (key) { return { amount: key.totalReceived, address: key.address, account: key.label } })
    .filter(function (key) { return key.amount !== 0 || params.includeempty })
}