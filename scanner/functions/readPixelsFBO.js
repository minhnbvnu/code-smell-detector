function readPixelsFBO(options) {
                var result;
                framebufferState.setFBO({
                    framebuffer: options.framebuffer
                }, function () {
                    result = readPixelsImpl(options);
                });
                return result;
            }