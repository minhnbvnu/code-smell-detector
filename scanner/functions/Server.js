function Server(options) {
  options = extend(OPTIONS, options);

  var Driver = mandatory(options.Driver);
  var Environment = mandatory(options.Environment);
  var MeshServer = mandatory(options.MeshServer);
  var ServiceManager = mandatory(options.ServiceManager);
  var dbDriver = mandatory(options.dbDriver);

  this._cmdName = options.cmdName || 'sl-pm';
  this._baseDir = path.resolve(options.baseDir || '.strong-pm');
  this._listenPort = 'listenPort' in options ? options.listenPort : 8701;
  this._httpServer = null;
  this._envPath = path.resolve(this._baseDir, 'env.json');
  this._defaultEnv = new Environment(this._envPath);
  this._minkelite = null;

  this._dataSourceConfig = null;
  switch (dbDriver) {
    case 'sqlite3':
      // delay requiring loopback-connector-sqlite3 as it's an optional dep
      this._dataSourceConfig = {
        connector: require('loopback-connector-sqlite3'),
        file: options['mesh.db.filePath'] ||
          path.join(this._baseDir, 'strong-mesh.db'),
      };
      break;
    case 'memory':
      this._dataSourceConfig = {
        connector: 'memory',
        file: process.env.STRONGLOOP_MESH_DB ||
          path.join(this._baseDir, 'strong-pm.json'),
      };
      break;
    default:
      throw new Error(fmt('data source %s not supported.', dbDriver));
  }

  var meshOptions = {
    db: this._dataSourceConfig,
  };

  // Instantiate minkelite so trace data can be stored
  var MinkeLite = null;
  try {
    MinkeLite = require('minkelite');
  } catch (_) {
    debug('Unable to load minkelite library. Disabling tracing');
  }

  if (MinkeLite) {
    /* eslint-disable camelcase */
    this._minkelite = new MinkeLite({
      start_server: !!process.env.STRONGLOOP_DEBUG_MINKELITE,
      server_port: options['trace.debugServerPort'] || 8103,

      in_memory: !!options['trace.db.inMemory'],
      db_name: options['trace.db.name'] || 'minkelite.db',
      overwrite: options['trace.db.overwrite'] || true,
      db_path: this._baseDir,

      // data points shown on the Timeline view
      chart_minutes: parseInt(options['trace.data.chartMinutes'], 10) ||
      1440, // how long we retain data in the db
      stale_minutes: parseInt(options['trace.data.staleMinutes'], 10) || 1450,
      max_transaction_count: parseInt(options['trace.data.maxTransaction'],
        10) || 30,
    });
    /* eslint-enable camelcase */
  }

  // The express app on which the rest of the middleware is mounted.
  this._baseApp = express();
  this._baseHttpServer = http.createServer(this._baseApp);
  this._wsRouter = new WebsocketRouter(this._baseHttpServer,
                                       this._baseApp,
                                       'instance-control');
  this._serviceManager = new ServiceManager(this, options);
  this._meshApp = MeshServer(
    this._serviceManager, this._minkelite, meshOptions);
  this._baseApp.use(auth(process.env.STRONGLOOP_PM_HTTP_AUTH));
  this._baseApp.use(this._meshApp);
  this._baseApp.use(this._serviceManager.handle);
  this._isStarted = false;

  // Pass properties to avoid dependencies on private properties.
  var ctlOptions = {
    server: this,
    base: this._baseDir, // XXX(sam) 'base' should be 'baseDir'
    models: this._meshApp.models, // FIXME should it need this?
  };

  // Control requests come from the mesh server/REST API via ServiceManager, or
  // from the parent via our process control channel.
  // XXX(sam) should probably be a method
  this.onCtlRequest = onCtlRequest.bind(null, ctlOptions);

  this._driver = new Driver({
    wsRouter: this._wsRouter,
    baseDir: this._baseDir,
    channelUrl: this._channelUrl,
    console: console,
    server: this,
  });

  this._driver.on('request', this._onInstanceRequest.bind(this));
  this._driver.on('listening', this._onInstanceListening.bind(this));
}