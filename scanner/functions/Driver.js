function Driver(options) {
  if (!(this instanceof Driver))
    return new Driver(options);

  EventEmitter.call(this);

  this._Container = options.Container || Container;
  this._baseDir = mandatory(options.baseDir);
  this._console = mandatory(options.console);
  this._server = mandatory(options.server);
  this._wsRouter = options.wsRouter;

  this._containers = Object.create(null);
  this.on('request', this._onRequest.bind(this));
}