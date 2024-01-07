constructor(registry, device) {
        // by default don't try cross-origin, because some browsers send different cookies (e.g. safari) if this is set.
        this.crossOrigin = registry.prefix ? 'anonymous' : null;
        this.maxRetries = 0;
        this.device = device;

        // run image alpha test
        // #if _DEBUG
        if (Tracing.get('IMG_ALPHA_TEST')) {
            ImgAlphaTest.run(this.device);
        }
        // #endif
    }