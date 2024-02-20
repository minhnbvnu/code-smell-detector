function mapActions(actions) {
  return objectMap(actions, action => (...args) => action(...args))
}