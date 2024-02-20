function satoshiToBTC (satoshi) {
  return parseFloat((satoshi / SATOSHI_PER_BTC).toFixed(8))
}