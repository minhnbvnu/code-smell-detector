function DaoMongo(config, log, next) {
  var self = this;

  events.EventEmitter.call(this);

  this._log = log;

  var options = {
    server : {},
    replset : {}
  };

  options.server.socketOptions = options.replset.socketOptions = {
    keepAlive: 1
  };

  //mongoose.set('debug', true);

  mongoose.connection.on('error', function(err) {
    log('MONGODB:UNCONNECTABLE:' + config.dbMongo.connect, 'error');
    log(err, 'error');
    if (/missing hostname/i.test(err.message)) {
      log('Exiting...', 'error');
      process.exit(0);
    } else {
      self.emit('error', err);
    }
  });

  mongoose.connection.on('open', function() {
    log('DAO:MONGODB:Connected');
    self.emit('ready', self);
    mongooseOpen = true;
  });

  if (!mongooseOpen) {
    try {
      mongoose.connect(config.dbMongo.connect, options);
    } catch (e) {
    }
  }
}