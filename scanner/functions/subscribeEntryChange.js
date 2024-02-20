function subscribeEntryChange (fn) {
  emitter.on('entry.change', fn)

  return function unsubscribe () {
    emitter.off('entry.change', fn)
  }
}