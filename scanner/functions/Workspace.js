constructor(params) {
    super(...arguments);

    this.updateWindowTitle = this.updateWindowTitle.bind(this);
    this.updateDocumentEdited = this.updateDocumentEdited.bind(this);
    this.didDestroyPaneItem = this.didDestroyPaneItem.bind(this);
    this.didChangeActivePaneOnPaneContainer = this.didChangeActivePaneOnPaneContainer.bind(
      this
    );
    this.didChangeActivePaneItemOnPaneContainer = this.didChangeActivePaneItemOnPaneContainer.bind(
      this
    );
    this.didActivatePaneContainer = this.didActivatePaneContainer.bind(this);

    this.enablePersistence = params.enablePersistence;
    this.packageManager = params.packageManager;
    this.config = params.config;
    this.project = params.project;
    this.notificationManager = params.notificationManager;
    this.viewRegistry = params.viewRegistry;
    this.grammarRegistry = params.grammarRegistry;
    this.applicationDelegate = params.applicationDelegate;
    this.assert = params.assert;
    this.deserializerManager = params.deserializerManager;
    this.textEditorRegistry = params.textEditorRegistry;
    this.styleManager = params.styleManager;
    this.draggingItem = false;
    this.itemLocationStore = new StateStore('AtomPreviousItemLocations', 1);

    this.emitter = new Emitter();
    this.openers = [];
    this.destroyedItemURIs = [];
    this.stoppedChangingActivePaneItemTimeout = null;

    this.scandalDirectorySearcher = new DefaultDirectorySearcher();
    this.ripgrepDirectorySearcher = new RipgrepDirectorySearcher();
    this.consumeServices(this.packageManager);

    this.paneContainers = {
      center: this.createCenter(),
      left: this.createDock('left'),
      right: this.createDock('right'),
      bottom: this.createDock('bottom')
    };
    this.activePaneContainer = this.paneContainers.center;
    this.hasActiveTextEditor = false;

    this.panelContainers = {
      top: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'top'
      }),
      left: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'left',
        dock: this.paneContainers.left
      }),
      right: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'right',
        dock: this.paneContainers.right
      }),
      bottom: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'bottom',
        dock: this.paneContainers.bottom
      }),
      header: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'header'
      }),
      footer: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'footer'
      }),
      modal: new PanelContainer({
        viewRegistry: this.viewRegistry,
        location: 'modal'
      })
    };

    this.incoming = new Map();
  }