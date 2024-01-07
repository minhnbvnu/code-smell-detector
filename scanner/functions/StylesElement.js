constructor() {
    super();
    this.subscriptions = new CompositeDisposable();
    this.emitter = new Emitter();
    this.styleElementClonesByOriginalElement = new WeakMap();
    this.context = null;
  }