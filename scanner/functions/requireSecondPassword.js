function requireSecondPassword (options) {
  return function (wallet) {
    if (wallet.isDoubleEncrypted && !wallet.validateSecondPassword(options.second_password)) {
      throw 'ERR_SECPASS'
    }
    return wallet
  }
}