constructor(canvas) {
        super();

        // #if _DEBUG
        if (version?.indexOf('$') < 0) {
            Debug.log(`Powered by PlayCanvas ${version} ${revision}`);
        }
        // #endif

        // Store application instance
        AppBase._applications[canvas.id] = this;
        setApplication(this);

        app = this;

        /** @private */
        this._destroyRequested = false;

        /** @private */
        this._inFrameUpdate = false;

        /** @private */
        this._time = 0;

        /**
         * Scales the global time delta. Defaults to 1.
         *
         * @type {number}
         * @example
         * // Set the app to run at half speed
         * this.app.timeScale = 0.5;
         */
        this.timeScale = 1;

        /**
         * Clamps per-frame delta time to an upper bound. Useful since returning from a tab
         * deactivation can generate huge values for dt, which can adversely affect game state.
         * Defaults to 0.1 (seconds).
         *
         * @type {number}
         * @example
         * // Don't clamp inter-frame times of 200ms or less
         * this.app.maxDeltaTime = 0.2;
         */
        this.maxDeltaTime = 0.1; // Maximum delta is 0.1s or 10 fps.

        /**
         * The total number of frames the application has updated since start() was called.
         *
         * @type {number}
         * @ignore
         */
        this.frame = 0;

        /**
         * When true, the application's render function is called every frame. Setting autoRender
         * to false is useful to applications where the rendered image may often be unchanged over
         * time. This can heavily reduce the application's load on the CPU and GPU. Defaults to
         * true.
         *
         * @type {boolean}
         * @example
         * // Disable rendering every frame and only render on a keydown event
         * this.app.autoRender = false;
         * this.app.keyboard.on('keydown', function (event) {
         *     this.app.renderNextFrame = true;
         * }, this);
         */
        this.autoRender = true;

        /**
         * Set to true to render the scene on the next iteration of the main loop. This only has an
         * effect if {@link AppBase#autoRender} is set to false. The value of renderNextFrame
         * is set back to false again as soon as the scene has been rendered.
         *
         * @type {boolean}
         * @example
         * // Render the scene only while space key is pressed
         * if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
         *     this.app.renderNextFrame = true;
         * }
         */
        this.renderNextFrame = false;

        /**
         * Enable if you want entity type script attributes to not be re-mapped when an entity is
         * cloned.
         *
         * @type {boolean}
         * @ignore
         */
        this.useLegacyScriptAttributeCloning = script.legacy;

        this._librariesLoaded = false;
        this._fillMode = FILLMODE_KEEP_ASPECT;
        this._resolutionMode = RESOLUTION_FIXED;
        this._allowResize = true;

        /**
         * For backwards compatibility with scripts 1.0.
         *
         * @type {AppBase}
         * @deprecated
         * @ignore
         */
        this.context = this;
    }