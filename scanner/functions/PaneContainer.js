constructor(params) {
    let applicationDelegate, deserializerManager, notificationManager;
    ({
      config: this.config,
      applicationDelegate,
      notificationManager,
      deserializerManager,
      viewRegistry: this.viewRegistry,
      location: this.location
    } = params);
    this.emitter = new Emitter();
    this.subscriptions = new CompositeDisposable();
    this.itemRegistry = new ItemRegistry();
    this.alive = true;
    this.stoppedChangingActivePaneItemTimeout = null;

    this.setRoot(
      new Pane({
        container: this,
        config: this.config,
        applicationDelegate,
        notificationManager,
        deserializerManager,
        viewRegistry: this.viewRegistry
      })
    );
    this.didActivatePane(this.getRoot());
  }