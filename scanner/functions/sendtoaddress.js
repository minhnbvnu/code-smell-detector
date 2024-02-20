function sendtoaddress (params, wallet) {
  var pass = getSecondPasswordForWallet(wallet)
  var from = wallet.spendableActiveAddresses
  var to = params.bitcoinAddress
  var amt = btcToSatoshi(params.amount)
  var fee = isNaN(wallet.fee_per_kb) ? 10000 : wallet.fee_per_kb

  var payment = wallet.createPayment().from(from).to(to).amount(amt).fee(fee)
  return publishPayment(payment, pass)
}