function bindEmitter(emitter, segment) {
  if (!emitter || !emitter.emit) {
    return emitter
  }

  const emit = getOriginal(emitter.emit)
  emitter.emit = this.bindFunction(emit, segment)

  return emitter
}