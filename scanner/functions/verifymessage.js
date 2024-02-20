function verifymessage (params, wallet) {
  try {
    return bitcoin.message.verify(params.bitcoinAddress, params.signature, params.message)
  } catch (e) {
    return false
  }
}