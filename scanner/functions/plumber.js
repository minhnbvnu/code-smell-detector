function plumber(opts) {
  opts = opts || {};

  if (typeof opts === 'function') {
    opts = { errorHandler: opts };
  }

  var through = through2.obj();
  through._plumber = true;

  if (opts.errorHandler !== false) {
    through.errorHandler = (typeof opts.errorHandler === 'function') ?
      opts.errorHandler :
      defaultErrorHandler;
  }

  function patchPipe(stream) {
    if (stream.pipe2) {
      wrapPanicOnErrorHandler(stream);
      stream._pipe = stream._pipe || stream.pipe;
      stream.pipe = stream.pipe2;
      stream.once('readable', patchPipe.bind(null, stream));
      stream._plumbed = true;
    }
  }

  through.pipe2 = function pipe2(dest) {

    if (!dest) {
      throw new gutil.PluginError('plumber', 'Can\'t pipe to undefined');
    }

    this._pipe.apply(this, arguments);

    if (dest._unplumbed) {
      return dest;
    }

    removeDefaultHandler(this, 'error');

    if (dest._plumber) {
      return dest;
    }

    dest.pipe2 = pipe2;

    // Patching pipe method
    if (opts.inherit !== false) {
      patchPipe(dest);
    }

    // Placing custom on error handler
    if (this.errorHandler) {
      dest.errorHandler = this.errorHandler;
      dest.on('error', this.errorHandler.bind(dest));
    }

    dest._plumbed = true;

    return dest;
  };

  patchPipe(through);

  return through;
}