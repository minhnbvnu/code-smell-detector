function createRenderbuffer(a, b) {
                var renderbuffer = new REGLRenderbuffer(gl.createRenderbuffer());
                renderbufferSet[renderbuffer.id] = renderbuffer;
                stats.renderbufferCount++;
                function reglRenderbuffer(a, b) {
                    var w = 0;
                    var h = 0;
                    var format = GL_RGBA4$1;
                    if (typeof a === 'object' && a) {
                        var options = a;
                        if ('shape' in options) {
                            var shape = options.shape;
                            check$1(Array.isArray(shape) && shape.length >= 2, 'invalid renderbuffer shape');
                            w = shape[0] | 0;
                            h = shape[1] | 0;
                        }
                        else {
                            if ('radius' in options) {
                                w = h = options.radius | 0;
                            }
                            if ('width' in options) {
                                w = options.width | 0;
                            }
                            if ('height' in options) {
                                h = options.height | 0;
                            }
                        }
                        if ('format' in options) {
                            check$1.parameter(options.format, formatTypes, 'invalid renderbuffer format');
                            format = formatTypes[options.format];
                        }
                    }
                    else if (typeof a === 'number') {
                        w = a | 0;
                        if (typeof b === 'number') {
                            h = b | 0;
                        }
                        else {
                            h = w;
                        }
                    }
                    else if (!a) {
                        w = h = 1;
                    }
                    else {
                        check$1.raise('invalid arguments to renderbuffer constructor');
                    }
                    // check shape
                    check$1(w > 0 && h > 0 &&
                        w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize, 'invalid renderbuffer size');
                    if (w === renderbuffer.width &&
                        h === renderbuffer.height &&
                        format === renderbuffer.format) {
                        return;
                    }
                    reglRenderbuffer.width = renderbuffer.width = w;
                    reglRenderbuffer.height = renderbuffer.height = h;
                    renderbuffer.format = format;
                    gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
                    gl.renderbufferStorage(GL_RENDERBUFFER, format, w, h);
                    check$1(gl.getError() === 0, 'invalid render buffer format');
                    if (config.profile) {
                        renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
                    }
                    reglRenderbuffer.format = formatTypesInvert[renderbuffer.format];
                    return reglRenderbuffer;
                }
                function resize(w_, h_) {
                    var w = w_ | 0;
                    var h = (h_ | 0) || w;
                    if (w === renderbuffer.width && h === renderbuffer.height) {
                        return reglRenderbuffer;
                    }
                    // check shape
                    check$1(w > 0 && h > 0 &&
                        w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize, 'invalid renderbuffer size');
                    reglRenderbuffer.width = renderbuffer.width = w;
                    reglRenderbuffer.height = renderbuffer.height = h;
                    gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
                    gl.renderbufferStorage(GL_RENDERBUFFER, renderbuffer.format, w, h);
                    check$1(gl.getError() === 0, 'invalid render buffer format');
                    // also, recompute size.
                    if (config.profile) {
                        renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
                    }
                    return reglRenderbuffer;
                }
                reglRenderbuffer(a, b);
                reglRenderbuffer.resize = resize;
                reglRenderbuffer._reglType = 'renderbuffer';
                reglRenderbuffer._renderbuffer = renderbuffer;
                if (config.profile) {
                    reglRenderbuffer.stats = renderbuffer.stats;
                }
                reglRenderbuffer.destroy = function () {
                    renderbuffer.decRef();
                };
                return reglRenderbuffer;
            }