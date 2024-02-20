function signmessage (params, wallet) {
  var pass = getSecondPasswordForWallet(wallet)
  var dec = wcrypto.cipherFunction(pass, wallet.sharedKey, wallet.pbkdf2_iterations, 'dec')
  var key = wallet.key(params.bitcoinAddress)

  if (!key) throw 'Private key is not known'

  var priv = wallet.isDoubleEncrypted ? dec(key.priv) : key.priv
  var format = helpers.detectPrivateKeyFormat(priv)
  var wif = helpers.privateKeyStringToKey(priv, format).toWIF()
  var keypair = bitcoin.ECPair.fromWIF(wif)

  return bitcoin.message.sign(keypair, params.message).toString('base64')
}