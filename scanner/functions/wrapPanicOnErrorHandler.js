function wrapPanicOnErrorHandler(stream) {
  var oldHandler = removeDefaultHandler(stream, 'error');
  if (oldHandler) {
    stream.on('error', function onerror2(er) {
      if (EE.listenerCount(stream, 'error') === 1) {
        this.removeListener('error', onerror2);
        oldHandler.call(stream, er);
      }
    });
  }
}