constructor({ atomEnvironment, applicationDelegate }) {
    this.handleDocumentKeyEvent = this.handleDocumentKeyEvent.bind(this);
    this.handleFocusNext = this.handleFocusNext.bind(this);
    this.handleFocusPrevious = this.handleFocusPrevious.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleEnterFullScreen = this.handleEnterFullScreen.bind(this);
    this.handleLeaveFullScreen = this.handleLeaveFullScreen.bind(this);
    this.handleWindowBeforeunload = this.handleWindowBeforeunload.bind(this);
    this.handleWindowToggleFullScreen = this.handleWindowToggleFullScreen.bind(
      this
    );
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.handleWindowReload = this.handleWindowReload.bind(this);
    this.handleWindowToggleDevTools = this.handleWindowToggleDevTools.bind(
      this
    );
    this.handleWindowToggleMenuBar = this.handleWindowToggleMenuBar.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleDocumentContextmenu = this.handleDocumentContextmenu.bind(this);
    this.atomEnvironment = atomEnvironment;
    this.applicationDelegate = applicationDelegate;
    this.reloadRequested = false;
    this.subscriptions = new CompositeDisposable();

    this.handleNativeKeybindings();
  }