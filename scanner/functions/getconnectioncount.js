function getconnectioncount (params) {
  return request('https://blockchain.info/q/nconnected')
}