function scheduleMicrotask(callback) {
  Promise.resolve()
    .then(callback)
    .catch(error =>
      setTimeout(() => {
        throw error
      })
    )
}