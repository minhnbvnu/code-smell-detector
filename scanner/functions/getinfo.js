function getinfo (params, wallet) {
  return Promise.all([
    bci.statistics.get(),
    request('https://blockchain.info/q/nconnected')
  ])
  .then(function (responses) {
    var stats = responses[0]
    var connected = responses[1]
    return {
      connected: parseInt(connected),
      difficulty: stats.difficulty,
      proxy: '',
      balance: satoshiToBTC(wallet.finalBalance),
      blocks: stats.n_blocks_total,
      testnet: false,
      errors: '',
      paytxfee: satoshiToBTC(wallet.fee_per_kb)
    }
  })
}