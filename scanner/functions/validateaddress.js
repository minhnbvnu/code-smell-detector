function validateaddress (params, wallet) {
  var pass = getSecondPasswordForWallet(wallet)
  var decipher = wcrypto.cipherFunction(pass, wallet.sharedKey, wallet.pbkdf2_iterations, 'dec')
  var key = wallet.key(params.bitcoinAddress)

  var compressed = false
  var pubkey = ''

  if (key && key.priv) {
    var priv = wallet.isDoubleEncrypted ? decipher(key.priv) : key.priv
    var format = helpers.detectPrivateKeyFormat(priv)
    var keypair = bitcoin.ECPair.fromWIF(helpers.privateKeyStringToKey(priv, format).toWIF())
    compressed = keypair.compressed
    pubkey = keypair.getPublicKeyBuffer().toString('hex')
  }

  return {
    address: params.bitcoinAddress,
    iscompressed: compressed,
    ismine: !!key && !!key.priv,
    isvalid: helpers.isBitcoinAddress(params.bitcoinAddress),
    account: key ? key.label : null,
    pubkey: pubkey
  }
}