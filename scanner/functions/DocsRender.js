function DocsRender(channel, store, id, story) {
    _classCallCheck(this, DocsRender);

    this.channel = channel;
    this.store = store;
    this.id = id;
    this.story = story;
    this.canvasElement = void 0;
    this.context = void 0;
    this.disableKeyListeners = false;
  }