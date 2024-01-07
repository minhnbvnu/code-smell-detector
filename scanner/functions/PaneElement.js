constructor() {
    super();
    this.attached = false;
    this.subscriptions = new CompositeDisposable();
    this.inlineDisplayStyles = new WeakMap();
    this.subscribeToDOMEvents();
    this.itemViews = document.createElement('div');
  }