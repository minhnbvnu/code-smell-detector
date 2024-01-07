constructor({
    notificationManager,
    packageManager,
    config,
    applicationDelegate,
    grammarRegistry
  }) {
    super();
    this.notificationManager = notificationManager;
    this.applicationDelegate = applicationDelegate;
    this.grammarRegistry = grammarRegistry;

    this.emitter = new Emitter();
    this.buffers = [];
    this.rootDirectories = [];
    this.repositories = [];
    this.directoryProviders = [];
    this.defaultDirectoryProvider = new DefaultDirectoryProvider();
    this.repositoryPromisesByPath = new Map();
    this.repositoryProviders = [new GitRepositoryProvider(this, config)];
    this.loadPromisesByPath = {};
    this.watcherPromisesByPath = {};
    this.retiredBufferIDs = new Set();
    this.retiredBufferPaths = new Set();
    this.subscriptions = new CompositeDisposable();
    this.consumeServices(packageManager);
  }