function createNoopStorage() {
  return {
    getItem: noop,
    setItem: noop,
    removeItem: noop
  }
}