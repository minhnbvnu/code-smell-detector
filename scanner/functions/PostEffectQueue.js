constructor(app, camera) {
        this.app = app;
        this.camera = camera;

        /**
         * Render target where the postprocessed image needs to be rendered to. Defaults to null
         * which is main framebuffer.
         *
         * @type {RenderTarget}
         * @ignore
         */
        this.destinationRenderTarget = null;

        /**
         * All of the post effects in the queue.
         *
         * @type {PostEffect[]}
         * @ignore
         */
        this.effects = [];

        /**
         * If the queue is enabled it will render all of its effects, otherwise it will not render
         * anything.
         *
         * @type {boolean}
         * @ignore
         */
        this.enabled = false;

        // legacy
        this.depthTarget = null;

        camera.on('set:rect', this.onCameraRectChanged, this);
    }