function UppySocket(opts) {
    this.opts = opts;
    this._queued = [];
    this.isOpen = false;
    this.emitter = ee();
    this._handleMessage = this._handleMessage.bind(this);
    this.close = this.close.bind(this);
    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.once = this.once.bind(this);
    this.send = this.send.bind(this);

    if (!opts || opts.autoOpen !== false) {
      this.open();
    }
  }