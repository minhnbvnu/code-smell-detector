function interceptPromise(prom, cb) {
  prom.then(cb, cb)
  return prom
}