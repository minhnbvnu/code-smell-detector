function sendmany (params, wallet) {
  var pass = getSecondPasswordForWallet(wallet)
  var from = getAccountAddresses(wallet, params.fromAccount)
  var fee = isNaN(wallet.fee_per_kb) ? 10000 : wallet.fee_per_kb
  var to = []
  var amts = []

  Object.keys(params.addressAmountPairs).forEach(function (address) {
    to.push(address)
    amts.push(btcToSatoshi(params.addressAmountPairs[address]))
  })

  var payment = wallet.createPayment().from(from).to(to).amount(amts).fee(fee)
  return publishPayment(payment, pass)
}