function thenifyAll(source, destination, methods) {
  return promisifyAll(source, destination, methods, thenify)
}