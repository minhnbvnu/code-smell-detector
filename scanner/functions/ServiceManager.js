function ServiceManager(server, options) {
  this._server = server;
  this._meshApp = null;
  this._basePort = (options && Number(options.basePort)) || 3000;

  debug('options: %j', options);

  // Bind handle to this for use as middleware.
  this.handle = this.handle.bind(this);
}