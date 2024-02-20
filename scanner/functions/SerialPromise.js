function SerialPromise(promises) {
  return promises.reduce((prev, p) => prev.then(() => p()), Promise.resolve())
}