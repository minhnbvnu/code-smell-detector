function Rabbit(cfg, next) {
  var self = this;
  this.exchanges = [];
  this.queues = [];
  this.cfg = cfg;
  var opt = {
    host: cfg.host,
    login: cfg.auth.username,
    password : cfg.auth.password,
    noDelay : true
  };

  if ('' !== cfg.vhost) {
    opt.vhost = cfg.vhost;
  }

  this.amqpConn = amqp.createConnection(opt,
  {
    defaultExchangeName: cfg.defaultExchange
  }
  );

  this.amqpConn.connectionStatus = null;

  // Setup our preconfigured exchanges, queues and routes
  this.amqpConn.on(
    'ready',
    function() {
	  self.amqpConn.connectionStatus = 'connected';
      for (xName in cfg.exchanges) {
        self.exchanges[xName] = self.amqpConn.exchange(
          xName,
          cfg.exchanges[xName].cfg,
          function() {
            var exchange = this;
            app.logmessage('RABBIT:X:' + this.name + ':UP');
            var xStruct = cfg.exchanges[this.name];

            // create default queue for this exchange
            self.queues[xStruct.queue_default.name] = self.amqpConn.queue(
              xStruct.queue_default.name,
              xStruct.queue_default.config,
              function() {
                this.bind(exchange, xStruct.route_default);
                app.logmessage('RABBIT:Q:' + (undefined !== next ? 'PUBSUB' : 'PUB') + this.name + ':UP' );
                if (next) {
                  next(this.name);
                }
              });
          });
      }
    });

  this.amqpConn.on('connect', function() {
    app.logmessage('RABBIT:Connected');
  });

  this.amqpConn.on('error', function(err) {
    self.amqpConn.connectionStatus = null;
  	app.logmessage('RABBIT:' + err, 'error');
  });
}