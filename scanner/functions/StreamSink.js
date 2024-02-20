function StreamSink(callback) {
  EventEmitter.call(this)

  this.callback = callback
  this.sink = ''
  this.writable = true

  const sink = this
  this.on('error', function handleError(error) {
    sink.writable = false
    callback(error)
  })
}