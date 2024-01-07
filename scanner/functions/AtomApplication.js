constructor(options) {
    StartupTime.addMarker('main-process:atom-application:constructor:start');

    super();
    this.quitting = false;
    this.quittingForUpdate = false;
    this.getAllWindows = this.getAllWindows.bind(this);
    this.getLastFocusedWindow = this.getLastFocusedWindow.bind(this);
    this.resourcePath = options.resourcePath;
    this.devResourcePath = options.devResourcePath;
    this.version = options.version;
    this.devMode = options.devMode;
    this.safeMode = options.safeMode;
    this.logFile = options.logFile;
    this.userDataDir = options.userDataDir;
    this._killProcess = options.killProcess || process.kill.bind(process);
    this.waitSessionsByWindow = new Map();
    this.windowStack = new WindowStack();

    this.initializeAtomHome(process.env.ATOM_HOME);

    const configFilePath = fs.existsSync(
      path.join(process.env.ATOM_HOME, 'config.json')
    )
      ? path.join(process.env.ATOM_HOME, 'config.json')
      : path.join(process.env.ATOM_HOME, 'config.cson');

    this.configFile = ConfigFile.at(configFilePath);
    this.config = new Config({
      saveCallback: settings => {
        if (!this.quitting) {
          return this.configFile.update(settings);
        }
      }
    });
    this.config.setSchema(null, {
      type: 'object',
      properties: _.clone(ConfigSchema)
    });

    this.fileRecoveryService = new FileRecoveryService(
      path.join(process.env.ATOM_HOME, 'recovery')
    );
    this.storageFolder = new StorageFolder(process.env.ATOM_HOME);
    this.autoUpdateManager = new AutoUpdateManager(
      this.version,
      options.test || options.benchmark || options.benchmarkTest,
      this.config
    );

    this.disposable = new CompositeDisposable();
    this.handleEvents();

    StartupTime.addMarker('main-process:atom-application:constructor:end');
  }