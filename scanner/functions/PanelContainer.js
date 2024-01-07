constructor({ location, dock, viewRegistry } = {}) {
    this.location = location;
    this.emitter = new Emitter();
    this.subscriptions = new CompositeDisposable();
    this.panels = [];
    this.dock = dock;
    this.viewRegistry = viewRegistry;
  }