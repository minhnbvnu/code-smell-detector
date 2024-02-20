function withCallback(source, destination, methods) {
  return promisifyAll(source, destination, methods, thenify.withCallback)
}