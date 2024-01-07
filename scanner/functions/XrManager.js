constructor(app) {
        super();

        this.app = app;

        // Add all the supported session types
        this._available[XRTYPE_INLINE] = false;
        this._available[XRTYPE_VR] = false;
        this._available[XRTYPE_AR] = false;

        this.depthSensing = new XrDepthSensing(this);
        this.domOverlay = new XrDomOverlay(this);
        this.hitTest = new XrHitTest(this);
        this.imageTracking = new XrImageTracking(this);
        this.planeDetection = new XrPlaneDetection(this);
        this.meshDetection = new XrMeshDetection(this);
        this.input = new XrInput(this);
        this.lightEstimation = new XrLightEstimation(this);
        this.anchors = new XrAnchors(this);
        this.views = new XrViews(this);

        // TODO
        // 1. HMD class with its params
        // 2. Space class
        // 3. Controllers class

        if (this._supported) {
            navigator.xr.addEventListener('devicechange', () => {
                this._deviceAvailabilityCheck();
            });
            this._deviceAvailabilityCheck();

            this.app.graphicsDevice.on('devicelost', this._onDeviceLost, this);
            this.app.graphicsDevice.on('devicerestored', this._onDeviceRestored, this);
        }
    }