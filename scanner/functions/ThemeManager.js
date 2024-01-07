constructor({
    packageManager,
    config,
    styleManager,
    notificationManager,
    viewRegistry
  }) {
    this.packageManager = packageManager;
    this.config = config;
    this.styleManager = styleManager;
    this.notificationManager = notificationManager;
    this.viewRegistry = viewRegistry;
    this.emitter = new Emitter();
    this.styleSheetDisposablesBySourcePath = {};
    this.lessCache = null;
    this.initialLoadComplete = false;
    this.packageManager.registerPackageActivator(this, ['theme']);
    this.packageManager.onDidActivateInitialPackages(() => {
      this.onDidChangeActiveThemes(() =>
        this.packageManager.reloadActivePackageStyleSheets()
      );
    });
  }