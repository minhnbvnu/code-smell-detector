function listtransactions (params, wallet) {
  if (!params.limit || params.limit > 25) params.limit = 25
  var addresses = params.account
    ? getAccountAddresses(wallet, params.account)
    : wallet.activeAddresses
  return bci.blockexplorer.getMultiAddress(addresses, params)
    .then(function (result) {
      return {
        lastblock: result.info.latest_block.hash,
        transactions: result.txs
      }
    })
}