constructor(options = {}) {
        this.id = id++;

        const _arg2 = arguments[1];
        const _arg3 = arguments[2];

        if (options instanceof GraphicsDevice) {
            // old constructor
            this._colorBuffer = _arg2;
            options = _arg3;

            Debug.deprecated('pc.RenderTarget constructor no longer accepts GraphicsDevice parameter.');

        } else {
            // new constructor
            this._colorBuffer = options.colorBuffer;
        }

        // Use the single colorBuffer in the colorBuffers array. This allows us to always just use the array internally.
        if (this._colorBuffer) {
            this._colorBuffers = [this._colorBuffer];
        }

        // Process optional arguments
        this._depthBuffer = options.depthBuffer;
        this._face = options.face ?? 0;

        if (this._depthBuffer) {
            const format = this._depthBuffer._format;
            if (format === PIXELFORMAT_DEPTH) {
                this._depth = true;
                this._stencil = false;
            } else if (format === PIXELFORMAT_DEPTHSTENCIL) {
                this._depth = true;
                this._stencil = true;
            } else {
                Debug.warn('Incorrect depthBuffer format. Must be pc.PIXELFORMAT_DEPTH or pc.PIXELFORMAT_DEPTHSTENCIL');
                this._depth = false;
                this._stencil = false;
            }
        } else {
            this._depth = options.depth ?? true;
            this._stencil = options.stencil ?? false;
        }

        // MRT
        if (options.colorBuffers) {
            Debug.assert(!this._colorBuffers, 'When constructing RenderTarget and options.colorBuffers is used, options.colorBuffer must not be used.');

            if (!this._colorBuffers) {
                this._colorBuffers = [...options.colorBuffers];

                // set the main color buffer to point to 0 index
                this._colorBuffer = options.colorBuffers[0];
            }
        }

        // device, from one of the buffers
        const device = this._colorBuffer?.device || this._depthBuffer?.device || options.graphicsDevice;
        Debug.assert(device, "Failed to obtain the device, colorBuffer nor depthBuffer store it.");
        this._device = device;

        Debug.call(() => {
            if (this._colorBuffers) {
                Debug.assert(this._colorBuffers.length <= 1 || device.supportsMrt, 'Multiple render targets are not supported on this device');
            }
        });

        // mark color buffer textures as render target
        this._colorBuffers?.forEach((colorBuffer) => {
            colorBuffer._isRenderTarget = true;
        });

        const { maxSamples } = this._device;
        this._samples = Math.min(options.samples ?? 1, maxSamples);

        // WebGPU only supports values of 1 or 4 for samples
        if (device.isWebGPU) {
            this._samples = this._samples > 1 ? maxSamples : 1;
        }

        this.autoResolve = options.autoResolve ?? true;

        // use specified name, otherwise get one from color or depth buffer
        this.name = options.name;
        if (!this.name) {
            this.name = this._colorBuffer?.name;
        }
        if (!this.name) {
            this.name = this._depthBuffer?.name;
        }
        if (!this.name) {
            this.name = "Untitled";
        }

        // render image flipped in Y
        this.flipY = options.flipY ?? false;

        this.validateMrt();

        // device specific implementation
        this.impl = device.createRenderTargetImpl(this);

        Debug.trace(TRACEID_RENDER_TARGET_ALLOC, `Alloc: Id ${this.id} ${this.name}: ${this.width}x${this.height} ` +
            `[samples: ${this.samples}]` +
            `${this._colorBuffers?.length ? `[MRT: ${this._colorBuffers.length}]` : ''}` +
            `${this.colorBuffer ? '[Color]' : ''}` +
            `${this.depth ? '[Depth]' : ''}` +
            `${this.stencil ? '[Stencil]' : ''}` +
            `[Face:${this.face}]`);
    }