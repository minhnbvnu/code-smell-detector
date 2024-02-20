function DockerDriver(opts) {
  if (!(this instanceof DockerDriver)) {
    return new DockerDriver(opts);
  }
  EventEmitter.call(this);
  this.docker = opts.docker || new Docker();
  this.Image = opts.Image || Image;

  this.baseDir = mandatory(opts.baseDir);
  this.console = mandatory(opts.console);
  this.server = mandatory(opts.server);
  this._wsRouter = opts.wsRouter;

  this._instances = {};

  this.defaultStartOptions = {
    profile: true,
    trace: false,
    size: 'STRONGLOOP_CLUSTER' in process.env ?
      process.env.STRONGLOOP_CLUSTER : 'CPU',
  };

  this.on('request', this._onRequest.bind(this));

  this.log = logTo(this.console.log);
  this.error = logTo(this.console.error);

  function logTo(logFn) {
    return log;

    function log() {
      var msg = fmt.apply(null, arguments);
      logFn('pm:docker: ' + msg);
    }
  }
}