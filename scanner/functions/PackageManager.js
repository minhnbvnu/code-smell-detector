constructor(params) {
    ({
      config: this.config,
      styleManager: this.styleManager,
      notificationManager: this.notificationManager,
      keymapManager: this.keymapManager,
      commandRegistry: this.commandRegistry,
      grammarRegistry: this.grammarRegistry,
      deserializerManager: this.deserializerManager,
      viewRegistry: this.viewRegistry,
      uriHandlerRegistry: this.uriHandlerRegistry
    } = params);

    this.emitter = new Emitter();
    this.activationHookEmitter = new Emitter();
    this.packageDirPaths = [];
    this.deferredActivationHooks = [];
    this.triggeredActivationHooks = new Set();
    this.packagesCache =
      packageJSON._atomPackages != null ? packageJSON._atomPackages : {};
    this.packageDependencies =
      packageJSON.packageDependencies != null
        ? packageJSON.packageDependencies
        : {};
    this.deprecatedPackages = packageJSON._deprecatedPackages || {};
    this.deprecatedPackageRanges = {};
    this.initialPackagesLoaded = false;
    this.initialPackagesActivated = false;
    this.preloadedPackages = {};
    this.loadedPackages = {};
    this.activePackages = {};
    this.activatingPackages = {};
    this.packageStates = {};
    this.serviceHub = new ServiceHub();

    this.packageActivators = [];
    this.registerPackageActivator(this, ['atom', 'textmate']);
  }