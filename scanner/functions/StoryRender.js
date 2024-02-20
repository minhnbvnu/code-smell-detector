function StoryRender(channel, store, renderToScreen, callbacks, id, viewMode, story) {
    _classCallCheck(this, StoryRender);

    this.channel = channel;
    this.store = store;
    this.renderToScreen = renderToScreen;
    this.callbacks = callbacks;
    this.id = id;
    this.viewMode = viewMode;
    this.story = void 0;
    this.phase = void 0;
    this.abortController = void 0;
    this.canvasElement = void 0;
    this.notYetRendered = true;
    this.disableKeyListeners = false;
    this.abortController = createController(); // Allow short-circuiting preparing if we happen to already
    // have the story (this is used by docs mode)

    if (story) {
      this.story = story; // TODO -- what should the phase be now?
      // TODO -- should we emit the render phase changed event?

      this.phase = 'preparing';
    }
  }