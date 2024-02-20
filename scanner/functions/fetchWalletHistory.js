function fetchWalletHistory (wallet) {
  winston.debug('Fetching wallet history')
  if (!(this instanceof WalletCache)) throw 'ERR_HISTORY'
  return wallet.getHistory().then(function () {
    this.refreshTimeStore[wallet.guid] = getProcessSeconds() + REFRESH_SEC
    return wallet
  }.bind(this))
}