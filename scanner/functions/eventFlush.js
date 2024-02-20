function eventFlush () {
  return new Promise(resolve => setImmediate(resolve))
}