constructor(system, entity) {
        super(system, entity);

        this._resolution = new Vec2(640, 320);
        this._referenceResolution = new Vec2(640, 320);
        this._scaleMode = SCALEMODE_NONE;
        this.scale = 1;
        this._scaleBlend = 0.5;

        this._priority = 0;

        this._screenSpace = false;

        /**
         * If true then elements inside this screen will be not be rendered when outside of the
         * screen (only valid when screenSpace is true).
         *
         * @type {boolean}
         */
        this.cull = this._screenSpace;
        this._screenMatrix = new Mat4();

        this._elements = new Set();

        system.app.graphicsDevice.on('resizecanvas', this._onResize, this);
    }