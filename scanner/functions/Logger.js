function Logger(options, extra) {
  if (!(this instanceof Logger)) {
    return new Logger(options, extra)
  }

  Readable.call(this)
  const passedInLevel = this.coerce(options.level)
  this.options = {
    _level: passedInLevel,
    enabled: options.enabled === undefined ? true : options.enabled,
    configured: options.configured === undefined ? true : !!options.configured
  }
  this._nestedLog = false
  this.name = options.name
  this.hostname = options.hostname || os.hostname()
  this.extra = extra || Object.create(null)
  this.buffer = ''
  this.reading = false
  this.logQueue = []
  if (options.stream) {
    this.pipe(options.stream)
  }
}