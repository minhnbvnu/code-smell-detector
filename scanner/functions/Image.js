function Image(driver, svcDir) {
  EventEmitter.call(this);
  this.debug = debug('strong-pm:docker:image');
  this.driver = driver;
  this.docker = driver.docker;

  // TODO: extract the below to drivers/common and remove from here and direct
  // driver if possible.

  // XXX(sam) might be able to use a single cicada, made in the driver, and
  // using the repo set to the svcId, but this works fine.
  this._svcDir = svcDir;
  this.git = cicada(this._svcDir);
  // this.git.container = this;

  // emits 'commit' on this.git after unpack
  this.tar = packReceiver(this.git);
  // this.tar.on('error', this.emit.bind(this, 'error'));

  // emits 'prepared' on this when received
  this.local = localDeploy(this);
  // this.local.on('error', this.emit.bind(this, 'error'));

  this.git.on('commit', this._onCommit.bind(this));
  this.on('commit', this._onCommit.bind(this));
  this.git.on('error', this.emit.bind(this, 'error'));
}