function parseFlags(flags, options) {
                if (typeof options !== 'object' || !options) {
                    return;
                }
                if ('premultiplyAlpha' in options) {
                    check$1.type(options.premultiplyAlpha, 'boolean', 'invalid premultiplyAlpha');
                    flags.premultiplyAlpha = options.premultiplyAlpha;
                }
                if ('flipY' in options) {
                    check$1.type(options.flipY, 'boolean', 'invalid texture flip');
                    flags.flipY = options.flipY;
                }
                if ('alignment' in options) {
                    check$1.oneOf(options.alignment, [1, 2, 4, 8], 'invalid texture unpack alignment');
                    flags.unpackAlignment = options.alignment;
                }
                if ('colorSpace' in options) {
                    check$1.parameter(options.colorSpace, colorSpace, 'invalid colorSpace');
                    flags.colorSpace = colorSpace[options.colorSpace];
                }
                if ('type' in options) {
                    var type = options.type;
                    check$1(extensions.oes_texture_float ||
                        !(type === 'float' || type === 'float32'), 'you must enable the OES_texture_float extension in order to use floating point textures.');
                    check$1(extensions.oes_texture_half_float ||
                        !(type === 'half float' || type === 'float16'), 'you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures.');
                    check$1(extensions.webgl_depth_texture ||
                        !(type === 'uint16' || type === 'uint32' || type === 'depth stencil'), 'you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.');
                    check$1.parameter(type, textureTypes, 'invalid texture type');
                    flags.type = textureTypes[type];
                }
                var w = flags.width;
                var h = flags.height;
                var c = flags.channels;
                var hasChannels = false;
                if ('shape' in options) {
                    check$1(Array.isArray(options.shape) && options.shape.length >= 2, 'shape must be an array');
                    w = options.shape[0];
                    h = options.shape[1];
                    if (options.shape.length === 3) {
                        c = options.shape[2];
                        check$1(c > 0 && c <= 4, 'invalid number of channels');
                        hasChannels = true;
                    }
                    check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid width');
                    check$1(h >= 0 && h <= limits.maxTextureSize, 'invalid height');
                }
                else {
                    if ('radius' in options) {
                        w = h = options.radius;
                        check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid radius');
                    }
                    if ('width' in options) {
                        w = options.width;
                        check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid width');
                    }
                    if ('height' in options) {
                        h = options.height;
                        check$1(h >= 0 && h <= limits.maxTextureSize, 'invalid height');
                    }
                    if ('channels' in options) {
                        c = options.channels;
                        check$1(c > 0 && c <= 4, 'invalid number of channels');
                        hasChannels = true;
                    }
                }
                flags.width = w | 0;
                flags.height = h | 0;
                flags.channels = c | 0;
                var hasFormat = false;
                if ('format' in options) {
                    var formatStr = options.format;
                    check$1(extensions.webgl_depth_texture ||
                        !(formatStr === 'depth' || formatStr === 'depth stencil'), 'you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.');
                    check$1.parameter(formatStr, textureFormats, 'invalid texture format');
                    var internalformat = flags.internalformat = textureFormats[formatStr];
                    flags.format = colorFormats[internalformat];
                    if (formatStr in textureTypes) {
                        if (!('type' in options)) {
                            flags.type = textureTypes[formatStr];
                        }
                    }
                    if (formatStr in compressedTextureFormats) {
                        flags.compressed = true;
                    }
                    hasFormat = true;
                }
                // Reconcile channels and format
                if (!hasChannels && hasFormat) {
                    flags.channels = FORMAT_CHANNELS[flags.format];
                }
                else if (hasChannels && !hasFormat) {
                    if (flags.channels !== CHANNELS_FORMAT[flags.format]) {
                        flags.format = flags.internalformat = CHANNELS_FORMAT[flags.channels];
                    }
                }
                else if (hasFormat && hasChannels) {
                    check$1(flags.channels === FORMAT_CHANNELS[flags.format], 'number of channels inconsistent with specified format');
                }
            }