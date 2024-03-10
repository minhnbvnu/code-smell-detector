function createTextureSet(gl, extensions, limits, reglPoll, contextState, stats, config) {
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
            function parseImage(image, options) {
                var data = null;
                if (isPixelData(options)) {
                    data = options;
                }
                else if (options) {
                    check$1.type(options, 'object', 'invalid pixel data type');
                    parseFlags(image, options);
                    if ('x' in options) {
                        image.xOffset = options.x | 0;
                    }
                    if ('y' in options) {
                        image.yOffset = options.y | 0;
                    }
                    if (isPixelData(options.data)) {
                        data = options.data;
                    }
                }
                check$1(!image.compressed ||
                    data instanceof Uint8Array, 'compressed texture data must be stored in a uint8array');
                if (options.copy) {
                    check$1(!data, 'can not specify copy and data field for the same texture');
                    var viewW = contextState.viewportWidth;
                    var viewH = contextState.viewportHeight;
                    image.width = image.width || (viewW - image.xOffset);
                    image.height = image.height || (viewH - image.yOffset);
                    image.needsCopy = true;
                    check$1(image.xOffset >= 0 && image.xOffset < viewW &&
                        image.yOffset >= 0 && image.yOffset < viewH &&
                        image.width > 0 && image.width <= viewW &&
                        image.height > 0 && image.height <= viewH, 'copy texture read out of bounds');
                }
                else if (!data) {
                    image.width = image.width || 1;
                    image.height = image.height || 1;
                    image.channels = image.channels || 4;
                }
                else if (isTypedArray(data)) {
                    image.channels = image.channels || 4;
                    image.data = data;
                    if (!('type' in options) && image.type === GL_UNSIGNED_BYTE$5) {
                        image.type = typedArrayCode$1(data);
                    }
                }
                else if (isNumericArray(data)) {
                    image.channels = image.channels || 4;
                    convertData(image, data);
                    image.alignment = 1;
                    image.needsFree = true;
                }
                else if (isNDArrayLike(data)) {
                    var array = data.data;
                    if (!Array.isArray(array) && image.type === GL_UNSIGNED_BYTE$5) {
                        image.type = typedArrayCode$1(array);
                    }
                    var shape = data.shape;
                    var stride = data.stride;
                    var shapeX, shapeY, shapeC, strideX, strideY, strideC;
                    if (shape.length === 3) {
                        shapeC = shape[2];
                        strideC = stride[2];
                    }
                    else {
                        check$1(shape.length === 2, 'invalid ndarray pixel data, must be 2 or 3D');
                        shapeC = 1;
                        strideC = 1;
                    }
                    shapeX = shape[0];
                    shapeY = shape[1];
                    strideX = stride[0];
                    strideY = stride[1];
                    image.alignment = 1;
                    image.width = shapeX;
                    image.height = shapeY;
                    image.channels = shapeC;
                    image.format = image.internalformat = CHANNELS_FORMAT[shapeC];
                    image.needsFree = true;
                    transposeData(image, array, strideX, strideY, strideC, data.offset);
                }
                else if (isCanvasElement(data) || isOffscreenCanvas(data) || isContext2D(data)) {
                    if (isCanvasElement(data) || isOffscreenCanvas(data)) {
                        image.element = data;
                    }
                    else {
                        image.element = data.canvas;
                    }
                    image.width = image.element.width;
                    image.height = image.element.height;
                    image.channels = 4;
                }
                else if (isBitmap(data)) {
                    image.element = data;
                    image.width = data.width;
                    image.height = data.height;
                    image.channels = 4;
                }
                else if (isImageElement(data)) {
                    image.element = data;
                    image.width = data.naturalWidth;
                    image.height = data.naturalHeight;
                    image.channels = 4;
                }
                else if (isVideoElement(data)) {
                    image.element = data;
                    image.width = data.videoWidth;
                    image.height = data.videoHeight;
                    image.channels = 4;
                }
                else if (isRectArray(data)) {
                    var w = image.width || data[0].length;
                    var h = image.height || data.length;
                    var c = image.channels;
                    if (isArrayLike(data[0][0])) {
                        c = c || data[0][0].length;
                    }
                    else {
                        c = c || 1;
                    }
                    var arrayShape = flattenUtils.shape(data);
                    var n = 1;
                    for (var dd = 0; dd < arrayShape.length; ++dd) {
                        n *= arrayShape[dd];
                    }
                    var allocData = preConvert(image, n);
                    flattenUtils.flatten(data, arrayShape, '', allocData);
                    postConvert(image, allocData);
                    image.alignment = 1;
                    image.width = w;
                    image.height = h;
                    image.channels = c;
                    image.format = image.internalformat = CHANNELS_FORMAT[c];
                    image.needsFree = true;
                }
                if (image.type === GL_FLOAT$4) {
                    check$1(limits.extensions.indexOf('oes_texture_float') >= 0, 'oes_texture_float extension not enabled');
                }
                else if (image.type === GL_HALF_FLOAT_OES$1) {
                    check$1(limits.extensions.indexOf('oes_texture_half_float') >= 0, 'oes_texture_half_float extension not enabled');
                }
                // do compressed texture  validation here.
            }
            function createTextureCube(a0, a1, a2, a3, a4, a5) {
                function reglTextureCube(a0, a1, a2, a3, a4, a5) {