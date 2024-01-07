constructor(params) {
    this.handleResizeHandleDragStart = this.handleResizeHandleDragStart.bind(
      this
    );
    this.handleResizeToFit = this.handleResizeToFit.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDrag = _.throttle(this.handleDrag.bind(this), 30);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleToggleButtonDragEnter = this.handleToggleButtonDragEnter.bind(
      this
    );
    this.toggle = this.toggle.bind(this);

    this.location = params.location;
    this.widthOrHeight = getWidthOrHeight(this.location);
    this.config = params.config;
    this.applicationDelegate = params.applicationDelegate;
    this.deserializerManager = params.deserializerManager;
    this.notificationManager = params.notificationManager;
    this.viewRegistry = params.viewRegistry;
    this.didActivate = params.didActivate;

    this.emitter = new Emitter();

    this.paneContainer = new PaneContainer({
      location: this.location,
      config: this.config,
      applicationDelegate: this.applicationDelegate,
      deserializerManager: this.deserializerManager,
      notificationManager: this.notificationManager,
      viewRegistry: this.viewRegistry
    });

    this.state = {
      size: null,
      visible: false,
      shouldAnimate: false
    };

    this.subscriptions = new CompositeDisposable(
      this.emitter,
      this.paneContainer.onDidActivatePane(() => {
        this.show();
        this.didActivate(this);
      }),
      this.paneContainer.observePanes(pane => {
        pane.onDidAddItem(this.handleDidAddPaneItem.bind(this));
        pane.onDidRemoveItem(this.handleDidRemovePaneItem.bind(this));
      }),
      this.paneContainer.onDidChangeActivePane(item =>
        params.didChangeActivePane(this, item)
      ),
      this.paneContainer.onDidChangeActivePaneItem(item =>
        params.didChangeActivePaneItem(this, item)
      ),
      this.paneContainer.onDidDestroyPaneItem(item =>
        params.didDestroyPaneItem(item)
      )
    );
  }