constructor(params = {}) {
    this.setPendingItem = this.setPendingItem.bind(this);
    this.getPendingItem = this.getPendingItem.bind(this);
    this.clearPendingItem = this.clearPendingItem.bind(this);
    this.onItemDidTerminatePendingState = this.onItemDidTerminatePendingState.bind(
      this
    );
    this.saveItem = this.saveItem.bind(this);
    this.saveItemAs = this.saveItemAs.bind(this);

    this.id = params.id;
    if (this.id != null) {
      nextInstanceId = Math.max(nextInstanceId, this.id + 1);
    } else {
      this.id = nextInstanceId++;
    }

    this.activeItem = params.activeItem;
    this.focused = params.focused != null ? params.focused : false;
    this.applicationDelegate = params.applicationDelegate;
    this.notificationManager = params.notificationManager;
    this.config = params.config;
    this.deserializerManager = params.deserializerManager;
    this.viewRegistry = params.viewRegistry;

    this.emitter = new Emitter();
    this.alive = true;
    this.subscriptionsPerItem = new WeakMap();
    this.items = [];
    this.itemStack = [];
    this.container = null;

    this.addItems((params.items || []).filter(item => item));
    if (!this.getActiveItem()) this.setActiveItem(this.items[0]);
    this.addItemsToStack(params.itemStackIndices || []);
    this.setFlexScale(params.flexScale || 1);
  }