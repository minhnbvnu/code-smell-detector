function getHandlers(emitter, type) {
  return emitter._handlers && emitter._handlers[type] || noHandlers
}