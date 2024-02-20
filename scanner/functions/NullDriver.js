function NullDriver(options) {
  if (!(this instanceof NullDriver)) {
    return new NullDriver(options);
  }
  assert('baseDir' in options, 'baseDir is provided');
  assert('console' in options, 'console is provided');
  assert('server' in options, 'server is provided');
  EventEmitter.call(this);
}