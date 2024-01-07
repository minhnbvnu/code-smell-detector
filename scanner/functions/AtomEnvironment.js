constructor(params = {}) {
    this.id = params.id != null ? params.id : nextId++;

    // Public: A {Clipboard} instance
    this.clipboard = params.clipboard;
    this.updateProcessEnv = params.updateProcessEnv || updateProcessEnv;
    this.enablePersistence = params.enablePersistence;
    this.applicationDelegate = params.applicationDelegate;

    this.nextProxyRequestId = 0;
    this.unloading = false;
    this.loadTime = null;
    this.emitter = new Emitter();
    this.disposables = new CompositeDisposable();
    this.pathsWithWaitSessions = new Set();

    // Public: A {DeserializerManager} instance
    this.deserializers = new DeserializerManager(this);
    this.deserializeTimings = {};

    // Public: A {ViewRegistry} instance
    this.views = new ViewRegistry(this);

    // Public: A {NotificationManager} instance
    this.notifications = new NotificationManager();

    this.stateStore = new StateStore('AtomEnvironments', 1);

    // Public: A {Config} instance
    this.config = new Config({
      saveCallback: settings => {
        if (this.enablePersistence) {
          this.applicationDelegate.setUserSettings(
            settings,
            this.config.getUserConfigPath()
          );
        }
      }
    });
    this.config.setSchema(null, {
      type: 'object',
      properties: _.clone(ConfigSchema)
    });

    // Public: A {KeymapManager} instance
    this.keymaps = new KeymapManager({
      notificationManager: this.notifications
    });

    // Public: A {TooltipManager} instance
    this.tooltips = new TooltipManager({
      keymapManager: this.keymaps,
      viewRegistry: this.views
    });

    // Public: A {CommandRegistry} instance
    this.commands = new CommandRegistry();
    this.uriHandlerRegistry = new URIHandlerRegistry();

    // Public: A {GrammarRegistry} instance
    this.grammars = new GrammarRegistry({ config: this.config });

    // Public: A {StyleManager} instance
    this.styles = new StyleManager();

    // Public: A {PackageManager} instance
    this.packages = new PackageManager({
      config: this.config,
      styleManager: this.styles,
      commandRegistry: this.commands,
      keymapManager: this.keymaps,
      notificationManager: this.notifications,
      grammarRegistry: this.grammars,
      deserializerManager: this.deserializers,
      viewRegistry: this.views,
      uriHandlerRegistry: this.uriHandlerRegistry
    });

    // Public: A {ThemeManager} instance
    this.themes = new ThemeManager({
      packageManager: this.packages,
      config: this.config,
      styleManager: this.styles,
      notificationManager: this.notifications,
      viewRegistry: this.views
    });

    // Public: A {MenuManager} instance
    this.menu = new MenuManager({
      keymapManager: this.keymaps,
      packageManager: this.packages
    });

    // Public: A {ContextMenuManager} instance
    this.contextMenu = new ContextMenuManager({ keymapManager: this.keymaps });

    this.packages.setMenuManager(this.menu);
    this.packages.setContextMenuManager(this.contextMenu);
    this.packages.setThemeManager(this.themes);

    // Public: A {Project} instance
    this.project = new Project({
      notificationManager: this.notifications,
      packageManager: this.packages,
      grammarRegistry: this.grammars,
      config: this.config,
      applicationDelegate: this.applicationDelegate
    });
    this.commandInstaller = new CommandInstaller(this.applicationDelegate);
    this.protocolHandlerInstaller = new ProtocolHandlerInstaller();

    // Public: A {TextEditorRegistry} instance
    this.textEditors = new TextEditorRegistry({
      config: this.config,
      grammarRegistry: this.grammars,
      assert: this.assert.bind(this),
      packageManager: this.packages
    });

    // Public: A {Workspace} instance
    this.workspace = new Workspace({
      config: this.config,
      project: this.project,
      packageManager: this.packages,
      grammarRegistry: this.grammars,
      deserializerManager: this.deserializers,
      notificationManager: this.notifications,
      applicationDelegate: this.applicationDelegate,
      viewRegistry: this.views,
      assert: this.assert.bind(this),
      textEditorRegistry: this.textEditors,
      styleManager: this.styles,
      enablePersistence: this.enablePersistence
    });

    this.themes.workspace = this.workspace;

    this.autoUpdater = new AutoUpdateManager({
      applicationDelegate: this.applicationDelegate
    });

    if (this.keymaps.canLoadBundledKeymapsFromMemory()) {
      this.keymaps.loadBundledKeymaps();
    }

    this.registerDefaultCommands();
    this.registerDefaultOpeners();
    this.registerDefaultDeserializers();

    this.windowEventHandler = new WindowEventHandler({
      atomEnvironment: this,
      applicationDelegate: this.applicationDelegate
    });

    // Public: A {HistoryManager} instance
    this.history = new HistoryManager({
      project: this.project,
      commands: this.commands,
      stateStore: this.stateStore
    });

    // Keep instances of HistoryManager in sync
    this.disposables.add(
      this.history.onDidChangeProjects(event => {
        if (!event.reloaded) this.applicationDelegate.didChangeHistoryManager();
      })
    );
  }