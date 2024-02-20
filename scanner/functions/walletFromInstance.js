function walletFromInstance (maybePw, instance) {
  if (!(this instanceof WalletCache)) throw 'ERR_UNEXPECT'
  var w = instance.MyWallet.wallet
  if (!validatePassword(this.pwHashStore[w.guid], maybePw)) throw 'ERR_PASSWORD'

  w.waitForSync = function (value) {
    winston.debug('Waiting for wallet sync')
    return new Promise(instance.MyWallet.syncWallet).then(function () {
      if (instance.WalletStore.isSynchronizedWithServer()) {
        winston.debug('Sync successful')
        return value
      } else {
        winston.error('Failed to sync wallet')
        return Promise.reject('ERR_SYNC')
      }
    }, function (error) {
      winston.error(error)
      return Promise.reject('ERR_SYNC')
    })
  }

  return w
}