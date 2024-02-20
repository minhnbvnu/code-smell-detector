function readPixelsImpl(input) {
                var type;
                if (framebufferState.next === null) {
                    check$1(glAttributes.preserveDrawingBuffer, 'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer');
                    type = GL_UNSIGNED_BYTE$7;
                }
                else {
                    check$1(framebufferState.next.colorAttachments[0].texture !== null, 'You cannot read from a renderbuffer');
                    type = framebufferState.next.colorAttachments[0].texture._texture.type;
                    check$1.optional(function () {
                        if (extensions.oes_texture_float) {
                            check$1(type === GL_UNSIGNED_BYTE$7 || type === GL_FLOAT$7, 'Reading from a framebuffer is only allowed for the types \'uint8\' and \'float\'');
                            if (type === GL_FLOAT$7) {
                                check$1(limits.readFloat, 'Reading \'float\' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float');
                            }
                        }
                        else {
                            check$1(type === GL_UNSIGNED_BYTE$7, 'Reading from a framebuffer is only allowed for the type \'uint8\'');
                        }
                    });
                }
                var x = 0;
                var y = 0;
                var width = context.framebufferWidth;
                var height = context.framebufferHeight;
                var data = null;
                if (isTypedArray(input)) {
                    data = input;
                }
                else if (input) {
                    check$1.type(input, 'object', 'invalid arguments to regl.read()');
                    x = input.x | 0;
                    y = input.y | 0;
                    check$1(x >= 0 && x < context.framebufferWidth, 'invalid x offset for regl.read');
                    check$1(y >= 0 && y < context.framebufferHeight, 'invalid y offset for regl.read');
                    width = (input.width || (context.framebufferWidth - x)) | 0;
                    height = (input.height || (context.framebufferHeight - y)) | 0;
                    data = input.data || null;
                }
                // sanity check input.data
                if (data) {
                    if (type === GL_UNSIGNED_BYTE$7) {
                        check$1(data instanceof Uint8Array, 'buffer must be \'Uint8Array\' when reading from a framebuffer of type \'uint8\'');
                    }
                    else if (type === GL_FLOAT$7) {
                        check$1(data instanceof Float32Array, 'buffer must be \'Float32Array\' when reading from a framebuffer of type \'float\'');
                    }
                }
                check$1(width > 0 && width + x <= context.framebufferWidth, 'invalid width for read pixels');
                check$1(height > 0 && height + y <= context.framebufferHeight, 'invalid height for read pixels');
                // Update WebGL state
                reglPoll();
                // Compute size
                var size = width * height * 4;
                // Allocate data
                if (!data) {
                    if (type === GL_UNSIGNED_BYTE$7) {
                        data = new Uint8Array(size);
                    }
                    else if (type === GL_FLOAT$7) {
                        data = data || new Float32Array(size);
                    }
                }
                // Type check
                check$1.isTypedArray(data, 'data buffer for regl.read() must be a typedarray');
                check$1(data.byteLength >= size, 'data buffer for regl.read() too small');
                // Run read pixels
                gl.pixelStorei(GL_PACK_ALIGNMENT, 4);
                gl.readPixels(x, y, width, height, GL_RGBA$3, type, data);
                return data;
            }