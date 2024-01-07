constructor(params) {
    this.config = params.config;
    this.packageManager = params.packageManager;
    this.styleManager = params.styleManager;
    this.commandRegistry = params.commandRegistry;
    this.keymapManager = params.keymapManager;
    this.notificationManager = params.notificationManager;
    this.grammarRegistry = params.grammarRegistry;
    this.themeManager = params.themeManager;
    this.menuManager = params.menuManager;
    this.contextMenuManager = params.contextMenuManager;
    this.deserializerManager = params.deserializerManager;
    this.viewRegistry = params.viewRegistry;
    this.emitter = new Emitter();

    this.mainModule = null;
    this.path = params.path;
    this.preloadedPackage = params.preloadedPackage;
    this.metadata =
      params.metadata || this.packageManager.loadPackageMetadata(this.path);
    this.bundledPackage =
      params.bundledPackage != null
        ? params.bundledPackage
        : this.packageManager.isBundledPackagePath(this.path);
    this.name =
      (this.metadata && this.metadata.name) ||
      params.name ||
      path.basename(this.path);
    this.reset();
  }