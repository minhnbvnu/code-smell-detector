function hasHandler(emitter, type) {
  return getHandlers(emitter, type).length > 0
}