function settxfee (params, wallet) {
  wallet.fee_per_kb = btcToSatoshi(params.amount)
  return true
}