function GulpSSH (options) {
  if (!(this instanceof GulpSSH)) return new GulpSSH(options)
  var ctx = this

  this.options = options || {}
  this._connecting = false
  this._connected = false
  this._ended = false
  this._readyEvents = []

  this.ssh2 = new Client()
  this.ssh2
    .on('connect', function () {
      gutil.log(packageName + ' :: Connect...')
      ctx.emit('connect')
    })
    .on('ready', function () {
      gutil.log(packageName + ' :: Ready')
      ctx._connecting = false
      ctx._connected = true
      flushReady(ctx)
      ctx.emit('ready')
    })
    .on('error', function (err) {
      gutil.colors.red(new gutil.PluginError(packageName, err))
      ctx.emit('error', err)
    })
    .on('end', function () {
      gutil.log(packageName + ' :: End')
      ctx._connecting = false
      ctx._connected = false
      ctx.emit('end')
    })
    .on('close', function (hadError) {
      gutil.log(packageName + ' :: Close')
      ctx._connecting = false
      ctx._connected = false
      ctx.emit('close', hadError)
    })

  EventEmitter.call(this)
}