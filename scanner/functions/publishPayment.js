function publishPayment (payment, password) {
  return new Promise(function (resolve, reject) {
    payment.build()
      .then(function (p) {
        resolve(payment.sign(password).publish().payment)
        return p
      })
      .catch(function (e) {
        reject(e.error ? (e.error.message || e.error) : 'Failed to build transaction')
        return e.payment
      })
  }).then(function (tx) {
    metrics.recordSend()
    return pluck('txid')(tx)
  })
}