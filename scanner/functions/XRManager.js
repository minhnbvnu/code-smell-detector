function XRManager() {
        this.xrSession = null;
        this.viewerSpace = null;
        this.viewerHitTestSource = null;
        this.xrData = new XRData();
        this.canvas = null;
        this.ctx = null;
        this.gameModule = null;
        this.polyfill = null;
        this.didNotifyUnity = false;
        this.isARSupported = false;
        this.isVRSupported = false;
        this.onInputEvent = null;
        this.onSessionVisibilityEvent = null;
        this.BrowserObject = null;
        this.JSEventsObject = null;
        this.init();
      }