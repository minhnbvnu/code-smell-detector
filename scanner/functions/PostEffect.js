constructor(graphicsDevice) {
        /**
         * The graphics device of the application.
         *
         * @type {import('../../platform/graphics/graphics-device.js').GraphicsDevice}
         */
        this.device = graphicsDevice;

        /**
         * The property that should to be set to `true` (by the custom post effect) if a depth map
         * is necessary (default is false).
         *
         * @type {boolean}
         */
        this.needsDepthBuffer = false;
    }