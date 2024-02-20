function startrpc (options) {
  var startOptions = {
    api_code: options.key,
    rpcport: options.rpcport || defaults.rpcport,
    bind: options.bind || defaults.bind
  }
  checkForUpgrade()
  wallet.startRPC(startOptions)
}