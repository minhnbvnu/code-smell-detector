function readPixels(options) {
                if (!options || !('framebuffer' in options)) {
                    return readPixelsImpl(options);
                }
                else {
                    return readPixelsFBO(options);
                }
            }