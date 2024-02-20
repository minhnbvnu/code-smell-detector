function createTextureSet(gl, extensions, limits, reglPoll, contextState, stats, config) {
            // -------------------------------------------------------
            // Initialize constants and parameter tables here
            // -------------------------------------------------------
            var mipmapHint = {
                "don't care": GL_DONT_CARE,
                'dont care': GL_DONT_CARE,
                'nice': GL_NICEST,
                'fast': GL_FASTEST
            };
            var wrapModes = {
                'repeat': GL_REPEAT,
                'clamp': GL_CLAMP_TO_EDGE$1,
                'mirror': GL_MIRRORED_REPEAT
            };
            var magFilters = {
                'nearest': GL_NEAREST$1,
                'linear': GL_LINEAR
            };
            var minFilters = extend({
                'mipmap': GL_LINEAR_MIPMAP_LINEAR$1,
                'nearest mipmap nearest': GL_NEAREST_MIPMAP_NEAREST$1,
                'linear mipmap nearest': GL_LINEAR_MIPMAP_NEAREST$1,
                'nearest mipmap linear': GL_NEAREST_MIPMAP_LINEAR$1,
                'linear mipmap linear': GL_LINEAR_MIPMAP_LINEAR$1
            }, magFilters);
            var colorSpace = {
                'none': 0,
                'browser': GL_BROWSER_DEFAULT_WEBGL
            };
            var textureTypes = {
                'uint8': GL_UNSIGNED_BYTE$5,
                'rgba4': GL_UNSIGNED_SHORT_4_4_4_4$1,
                'rgb565': GL_UNSIGNED_SHORT_5_6_5$1,
                'rgb5 a1': GL_UNSIGNED_SHORT_5_5_5_1$1
            };
            var textureFormats = {
                'alpha': GL_ALPHA,
                'luminance': GL_LUMINANCE,
                'luminance alpha': GL_LUMINANCE_ALPHA,
                'rgb': GL_RGB,
                'rgba': GL_RGBA$1,
                'rgba4': GL_RGBA4,
                'rgb5 a1': GL_RGB5_A1,
                'rgb565': GL_RGB565
            };
            var compressedTextureFormats = {};
            if (extensions.ext_srgb) {
                textureFormats.srgb = GL_SRGB_EXT;
                textureFormats.srgba = GL_SRGB_ALPHA_EXT;
            }
            if (extensions.oes_texture_float) {
                textureTypes.float32 = textureTypes.float = GL_FLOAT$4;
            }
            if (extensions.oes_texture_half_float) {
                textureTypes['float16'] = textureTypes['half float'] = GL_HALF_FLOAT_OES$1;
            }
            if (extensions.webgl_depth_texture) {
                extend(textureFormats, {
                    'depth': GL_DEPTH_COMPONENT,
                    'depth stencil': GL_DEPTH_STENCIL
                });
                extend(textureTypes, {
                    'uint16': GL_UNSIGNED_SHORT$3,
                    'uint32': GL_UNSIGNED_INT$3,
                    'depth stencil': GL_UNSIGNED_INT_24_8_WEBGL$1
                });
            }
            if (extensions.webgl_compressed_texture_s3tc) {
                extend(compressedTextureFormats, {
                    'rgb s3tc dxt1': GL_COMPRESSED_RGB_S3TC_DXT1_EXT,
                    'rgba s3tc dxt1': GL_COMPRESSED_RGBA_S3TC_DXT1_EXT,
                    'rgba s3tc dxt3': GL_COMPRESSED_RGBA_S3TC_DXT3_EXT,
                    'rgba s3tc dxt5': GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
                });
            }
            if (extensions.webgl_compressed_texture_atc) {
                extend(compressedTextureFormats, {
                    'rgb atc': GL_COMPRESSED_RGB_ATC_WEBGL,
                    'rgba atc explicit alpha': GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
                    'rgba atc interpolated alpha': GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
                });
            }
            if (extensions.webgl_compressed_texture_pvrtc) {
                extend(compressedTextureFormats, {
                    'rgb pvrtc 4bppv1': GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
                    'rgb pvrtc 2bppv1': GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
                    'rgba pvrtc 4bppv1': GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
                    'rgba pvrtc 2bppv1': GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                });
            }
            if (extensions.webgl_compressed_texture_etc1) {
                compressedTextureFormats['rgb etc1'] = GL_COMPRESSED_RGB_ETC1_WEBGL;
            }
            // Copy over all texture formats
            var supportedCompressedFormats = Array.prototype.slice.call(gl.getParameter(GL_COMPRESSED_TEXTURE_FORMATS));
            Object.keys(compressedTextureFormats).forEach(function (name) {
                var format = compressedTextureFormats[name];
                if (supportedCompressedFormats.indexOf(format) >= 0) {
                    textureFormats[name] = format;
                }
            });
            var supportedFormats = Object.keys(textureFormats);
            limits.textureFormats = supportedFormats;
            // associate with every format string its
            // corresponding GL-value.
            var textureFormatsInvert = [];
            Object.keys(textureFormats).forEach(function (key) {
                var val = textureFormats[key];
                textureFormatsInvert[val] = key;
            });
            // associate with every type string its
            // corresponding GL-value.
            var textureTypesInvert = [];
            Object.keys(textureTypes).forEach(function (key) {
                var val = textureTypes[key];
                textureTypesInvert[val] = key;
            });
            var magFiltersInvert = [];
            Object.keys(magFilters).forEach(function (key) {
                var val = magFilters[key];
                magFiltersInvert[val] = key;
            });
            var minFiltersInvert = [];
            Object.keys(minFilters).forEach(function (key) {
                var val = minFilters[key];
                minFiltersInvert[val] = key;
            });
            var wrapModesInvert = [];
            Object.keys(wrapModes).forEach(function (key) {
                var val = wrapModes[key];
                wrapModesInvert[val] = key;
            });
            // colorFormats[] gives the format (channels) associated to an
            // internalformat
            var colorFormats = supportedFormats.reduce(function (color, key) {
                var glenum = textureFormats[key];
                if (glenum === GL_LUMINANCE ||
                    glenum === GL_ALPHA ||
                    glenum === GL_LUMINANCE ||
                    glenum === GL_LUMINANCE_ALPHA ||
                    glenum === GL_DEPTH_COMPONENT ||
                    glenum === GL_DEPTH_STENCIL ||
                    (extensions.ext_srgb &&
                        (glenum === GL_SRGB_EXT ||
                            glenum === GL_SRGB_ALPHA_EXT))) {
                    color[glenum] = glenum;
                }
                else if (glenum === GL_RGB5_A1 || key.indexOf('rgba') >= 0) {
                    color[glenum] = GL_RGBA$1;
                }
                else {
                    color[glenum] = GL_RGB;
                }
                return color;
            }, {});
            function TexFlags() {
                // format info
                this.internalformat = GL_RGBA$1;
                this.format = GL_RGBA$1;
                this.type = GL_UNSIGNED_BYTE$5;
                this.compressed = false;
                // pixel storage
                this.premultiplyAlpha = false;
                this.flipY = false;
                this.unpackAlignment = 1;
                this.colorSpace = GL_BROWSER_DEFAULT_WEBGL;
                // shape info
                this.width = 0;
                this.height = 0;
                this.channels = 0;
            }
            function copyFlags(result, other) {
                result.internalformat = other.internalformat;
                result.format = other.format;
                result.type = other.type;
                result.compressed = other.compressed;
                result.premultiplyAlpha = other.premultiplyAlpha;
                result.flipY = other.flipY;
                result.unpackAlignment = other.unpackAlignment;
                result.colorSpace = other.colorSpace;
                result.width = other.width;
                result.height = other.height;
                result.channels = other.channels;
            }
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
            function setFlags(flags) {
                gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, flags.flipY);
                gl.pixelStorei(GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
                gl.pixelStorei(GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, flags.colorSpace);
                gl.pixelStorei(GL_UNPACK_ALIGNMENT, flags.unpackAlignment);
            }
            // -------------------------------------------------------
            // Tex image data
            // -------------------------------------------------------
            function TexImage() {
                TexFlags.call(this);
                this.xOffset = 0;
                this.yOffset = 0;
                // data
                this.data = null;
                this.needsFree = false;
                // html element
                this.element = null;
                // copyTexImage info
                this.needsCopy = false;
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
            function setImage(info, target, miplevel) {
                var element = info.element;
                var data = info.data;
                var internalformat = info.internalformat;
                var format = info.format;
                var type = info.type;
                var width = info.width;
                var height = info.height;
                setFlags(info);
                if (element) {
                    gl.texImage2D(target, miplevel, format, format, type, element);
                }
                else if (info.compressed) {
                    gl.compressedTexImage2D(target, miplevel, internalformat, width, height, 0, data);
                }
                else if (info.needsCopy) {
                    reglPoll();
                    gl.copyTexImage2D(target, miplevel, format, info.xOffset, info.yOffset, width, height, 0);
                }
                else {
                    gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data || null);
                }
            }
            function setSubImage(info, target, x, y, miplevel) {
                var element = info.element;
                var data = info.data;
                var internalformat = info.internalformat;
                var format = info.format;
                var type = info.type;
                var width = info.width;
                var height = info.height;
                setFlags(info);
                if (element) {
                    gl.texSubImage2D(target, miplevel, x, y, format, type, element);
                }
                else if (info.compressed) {
                    gl.compressedTexSubImage2D(target, miplevel, x, y, internalformat, width, height, data);
                }
                else if (info.needsCopy) {
                    reglPoll();
                    gl.copyTexSubImage2D(target, miplevel, x, y, info.xOffset, info.yOffset, width, height);
                }
                else {
                    gl.texSubImage2D(target, miplevel, x, y, width, height, format, type, data);
                }
            }
            // texImage pool
            var imagePool = [];
            function allocImage() {
                return imagePool.pop() || new TexImage();
            }
            function freeImage(image) {
                if (image.needsFree) {
                    pool.freeType(image.data);
                }
                TexImage.call(image);
                imagePool.push(image);
            }
            // -------------------------------------------------------
            // Mip map
            // -------------------------------------------------------
            function MipMap() {
                TexFlags.call(this);
                this.genMipmaps = false;
                this.mipmapHint = GL_DONT_CARE;
                this.mipmask = 0;
                this.images = Array(16);
            }
            function parseMipMapFromShape(mipmap, width, height) {
                var img = mipmap.images[0] = allocImage();
                mipmap.mipmask = 1;
                img.width = mipmap.width = width;
                img.height = mipmap.height = height;
                img.channels = mipmap.channels = 4;
            }
            function parseMipMapFromObject(mipmap, options) {
                var imgData = null;
                if (isPixelData(options)) {
                    imgData = mipmap.images[0] = allocImage();
                    copyFlags(imgData, mipmap);
                    parseImage(imgData, options);
                    mipmap.mipmask = 1;
                }
                else {
                    parseFlags(mipmap, options);
                    if (Array.isArray(options.mipmap)) {
                        var mipData = options.mipmap;
                        for (var i = 0; i < mipData.length; ++i) {
                            imgData = mipmap.images[i] = allocImage();
                            copyFlags(imgData, mipmap);
                            imgData.width >>= i;
                            imgData.height >>= i;
                            parseImage(imgData, mipData[i]);
                            mipmap.mipmask |= (1 << i);
                        }
                    }
                    else {
                        imgData = mipmap.images[0] = allocImage();
                        copyFlags(imgData, mipmap);
                        parseImage(imgData, options);
                        mipmap.mipmask = 1;
                    }
                }
                copyFlags(mipmap, mipmap.images[0]);
                // For textures of the compressed format WEBGL_compressed_texture_s3tc
                // we must have that
                //
                // "When level equals zero width and height must be a multiple of 4.
                // When level is greater than 0 width and height must be 0, 1, 2 or a multiple of 4. "
                //
                // but we do not yet support having multiple mipmap levels for compressed textures,
                // so we only test for level zero.
                if (mipmap.compressed &&
                    (mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT ||
                        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT ||
                        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT ||
                        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT)) {
                    check$1(mipmap.width % 4 === 0 && mipmap.height % 4 === 0, 'for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4');
                }
            }
            function setMipMap(mipmap, target) {
                var images = mipmap.images;
                for (var i = 0; i < images.length; ++i) {
                    if (!images[i]) {
                        return;
                    }
                    setImage(images[i], target, i);
                }
            }
            var mipPool = [];
            function allocMipMap() {
                var result = mipPool.pop() || new MipMap();
                TexFlags.call(result);
                result.mipmask = 0;
                for (var i = 0; i < 16; ++i) {
                    result.images[i] = null;
                }
                return result;
            }
            function freeMipMap(mipmap) {
                var images = mipmap.images;
                for (var i = 0; i < images.length; ++i) {
                    if (images[i]) {
                        freeImage(images[i]);
                    }
                    images[i] = null;
                }
                mipPool.push(mipmap);
            }
            // -------------------------------------------------------
            // Tex info
            // -------------------------------------------------------
            function TexInfo() {
                this.minFilter = GL_NEAREST$1;
                this.magFilter = GL_NEAREST$1;
                this.wrapS = GL_CLAMP_TO_EDGE$1;
                this.wrapT = GL_CLAMP_TO_EDGE$1;
                this.anisotropic = 1;
                this.genMipmaps = false;
                this.mipmapHint = GL_DONT_CARE;
            }
            function parseTexInfo(info, options) {
                if ('min' in options) {
                    var minFilter = options.min;
                    check$1.parameter(minFilter, minFilters);
                    info.minFilter = minFilters[minFilter];
                    if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0 && !('faces' in options)) {
                        info.genMipmaps = true;
                    }
                }
                if ('mag' in options) {
                    var magFilter = options.mag;
                    check$1.parameter(magFilter, magFilters);
                    info.magFilter = magFilters[magFilter];
                }
                var wrapS = info.wrapS;
                var wrapT = info.wrapT;
                if ('wrap' in options) {
                    var wrap = options.wrap;
                    if (typeof wrap === 'string') {
                        check$1.parameter(wrap, wrapModes);
                        wrapS = wrapT = wrapModes[wrap];
                    }
                    else if (Array.isArray(wrap)) {
                        check$1.parameter(wrap[0], wrapModes);
                        check$1.parameter(wrap[1], wrapModes);
                        wrapS = wrapModes[wrap[0]];
                        wrapT = wrapModes[wrap[1]];
                    }
                }
                else {
                    if ('wrapS' in options) {
                        var optWrapS = options.wrapS;
                        check$1.parameter(optWrapS, wrapModes);
                        wrapS = wrapModes[optWrapS];
                    }
                    if ('wrapT' in options) {
                        var optWrapT = options.wrapT;
                        check$1.parameter(optWrapT, wrapModes);
                        wrapT = wrapModes[optWrapT];
                    }
                }
                info.wrapS = wrapS;
                info.wrapT = wrapT;
                if ('anisotropic' in options) {
                    var anisotropic = options.anisotropic;
                    check$1(typeof anisotropic === 'number' &&
                        anisotropic >= 1 && anisotropic <= limits.maxAnisotropic, 'aniso samples must be between 1 and ');
                    info.anisotropic = options.anisotropic;
                }
                if ('mipmap' in options) {
                    var hasMipMap = false;
                    switch (typeof options.mipmap) {
                        case 'string':
                            check$1.parameter(options.mipmap, mipmapHint, 'invalid mipmap hint');
                            info.mipmapHint = mipmapHint[options.mipmap];
                            info.genMipmaps = true;
                            hasMipMap = true;
                            break;
                        case 'boolean':
                            hasMipMap = info.genMipmaps = options.mipmap;
                            break;
                        case 'object':
                            check$1(Array.isArray(options.mipmap), 'invalid mipmap type');
                            info.genMipmaps = false;
                            hasMipMap = true;
                            break;
                        default:
                            check$1.raise('invalid mipmap type');
                    }
                    if (hasMipMap && !('min' in options)) {
                        info.minFilter = GL_NEAREST_MIPMAP_NEAREST$1;
                    }
                }
            }
            function setTexInfo(info, target) {
                gl.texParameteri(target, GL_TEXTURE_MIN_FILTER, info.minFilter);
                gl.texParameteri(target, GL_TEXTURE_MAG_FILTER, info.magFilter);
                gl.texParameteri(target, GL_TEXTURE_WRAP_S, info.wrapS);
                gl.texParameteri(target, GL_TEXTURE_WRAP_T, info.wrapT);
                if (extensions.ext_texture_filter_anisotropic) {
                    gl.texParameteri(target, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
                }
                if (info.genMipmaps) {
                    gl.hint(GL_GENERATE_MIPMAP_HINT, info.mipmapHint);
                    gl.generateMipmap(target);
                }
            }
            // -------------------------------------------------------
            // Full texture object
            // -------------------------------------------------------
            var textureCount = 0;
            var textureSet = {};
            var numTexUnits = limits.maxTextureUnits;
            var textureUnits = Array(numTexUnits).map(function () {
                return null;
            });
            function REGLTexture(target) {
                TexFlags.call(this);
                this.mipmask = 0;
                this.internalformat = GL_RGBA$1;
                this.id = textureCount++;
                this.refCount = 1;
                this.target = target;
                this.texture = gl.createTexture();
                this.unit = -1;
                this.bindCount = 0;
                this.texInfo = new TexInfo();
                if (config.profile) {
                    this.stats = { size: 0 };
                }
            }
            function tempBind(texture) {
                gl.activeTexture(GL_TEXTURE0$1);
                gl.bindTexture(texture.target, texture.texture);
            }
            function tempRestore() {
                var prev = textureUnits[0];
                if (prev) {
                    gl.bindTexture(prev.target, prev.texture);
                }
                else {
                    gl.bindTexture(GL_TEXTURE_2D$1, null);
                }
            }
            function destroy(texture) {
                var handle = texture.texture;
                check$1(handle, 'must not double destroy texture');
                var unit = texture.unit;
                var target = texture.target;
                if (unit >= 0) {
                    gl.activeTexture(GL_TEXTURE0$1 + unit);
                    gl.bindTexture(target, null);
                    textureUnits[unit] = null;
                }
                gl.deleteTexture(handle);
                texture.texture = null;
                texture.params = null;
                texture.pixels = null;
                texture.refCount = 0;
                delete textureSet[texture.id];
                stats.textureCount--;
            }
            extend(REGLTexture.prototype, {
                bind: function () {
                    var texture = this;
                    texture.bindCount += 1;
                    var unit = texture.unit;
                    if (unit < 0) {
                        for (var i = 0; i < numTexUnits; ++i) {
                            var other = textureUnits[i];
                            if (other) {
                                if (other.bindCount > 0) {
                                    continue;
                                }
                                other.unit = -1;
                            }
                            textureUnits[i] = texture;
                            unit = i;
                            break;
                        }
                        if (unit >= numTexUnits) {
                            check$1.raise('insufficient number of texture units');
                        }
                        if (config.profile && stats.maxTextureUnits < (unit + 1)) {
                            stats.maxTextureUnits = unit + 1; // +1, since the units are zero-based
                        }
                        texture.unit = unit;
                        gl.activeTexture(GL_TEXTURE0$1 + unit);
                        gl.bindTexture(texture.target, texture.texture);
                    }
                    return unit;
                },
                unbind: function () {
                    this.bindCount -= 1;
                },
                decRef: function () {
                    if (--this.refCount <= 0) {
                        destroy(this);
                    }
                }
            });
            function createTexture2D(a, b) {
                var texture = new REGLTexture(GL_TEXTURE_2D$1);
                textureSet[texture.id] = texture;
                stats.textureCount++;
                function reglTexture2D(a, b) {
                    var texInfo = texture.texInfo;
                    TexInfo.call(texInfo);
                    var mipData = allocMipMap();
                    if (typeof a === 'number') {
                        if (typeof b === 'number') {
                            parseMipMapFromShape(mipData, a | 0, b | 0);
                        }
                        else {
                            parseMipMapFromShape(mipData, a | 0, a | 0);
                        }
                    }
                    else if (a) {
                        check$1.type(a, 'object', 'invalid arguments to regl.texture');
                        parseTexInfo(texInfo, a);
                        parseMipMapFromObject(mipData, a);
                    }
                    else {
                        // empty textures get assigned a default shape of 1x1
                        parseMipMapFromShape(mipData, 1, 1);
                    }
                    if (texInfo.genMipmaps) {
                        mipData.mipmask = (mipData.width << 1) - 1;
                    }
                    texture.mipmask = mipData.mipmask;
                    copyFlags(texture, mipData);
                    check$1.texture2D(texInfo, mipData, limits);
                    texture.internalformat = mipData.internalformat;
                    reglTexture2D.width = mipData.width;
                    reglTexture2D.height = mipData.height;
                    tempBind(texture);
                    setMipMap(mipData, GL_TEXTURE_2D$1);
                    setTexInfo(texInfo, GL_TEXTURE_2D$1);
                    tempRestore();
                    freeMipMap(mipData);
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, mipData.width, mipData.height, texInfo.genMipmaps, false);
                    }
                    reglTexture2D.format = textureFormatsInvert[texture.internalformat];
                    reglTexture2D.type = textureTypesInvert[texture.type];
                    reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
                    reglTexture2D.min = minFiltersInvert[texInfo.minFilter];
                    reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
                    reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];
                    return reglTexture2D;
                }
                function subimage(image, x_, y_, level_) {
                    check$1(!!image, 'must specify image data');
                    var x = x_ | 0;
                    var y = y_ | 0;
                    var level = level_ | 0;
                    var imageData = allocImage();
                    copyFlags(imageData, texture);
                    imageData.width = 0;
                    imageData.height = 0;
                    parseImage(imageData, image);
                    imageData.width = imageData.width || ((texture.width >> level) - x);
                    imageData.height = imageData.height || ((texture.height >> level) - y);
                    check$1(texture.type === imageData.type &&
                        texture.format === imageData.format &&
                        texture.internalformat === imageData.internalformat, 'incompatible format for texture.subimage');
                    check$1(x >= 0 && y >= 0 &&
                        x + imageData.width <= texture.width &&
                        y + imageData.height <= texture.height, 'texture.subimage write out of bounds');
                    check$1(texture.mipmask & (1 << level), 'missing mipmap data');
                    check$1(imageData.data || imageData.element || imageData.needsCopy, 'missing image data');
                    tempBind(texture);
                    setSubImage(imageData, GL_TEXTURE_2D$1, x, y, level);
                    tempRestore();
                    freeImage(imageData);
                    return reglTexture2D;
                }
                function resize(w_, h_) {
                    var w = w_ | 0;
                    var h = (h_ | 0) || w;
                    if (w === texture.width && h === texture.height) {
                        return reglTexture2D;
                    }
                    reglTexture2D.width = texture.width = w;
                    reglTexture2D.height = texture.height = h;
                    tempBind(texture);
                    for (var i = 0; texture.mipmask >> i; ++i) {
                        var _w = w >> i;
                        var _h = h >> i;
                        if (!_w || !_h)
                            break;
                        gl.texImage2D(GL_TEXTURE_2D$1, i, texture.format, _w, _h, 0, texture.format, texture.type, null);
                    }
                    tempRestore();
                    // also, recompute the texture size.
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, w, h, false, false);
                    }
                    return reglTexture2D;
                }
                reglTexture2D(a, b);
                reglTexture2D.subimage = subimage;
                reglTexture2D.resize = resize;
                reglTexture2D._reglType = 'texture2d';
                reglTexture2D._texture = texture;
                if (config.profile) {
                    reglTexture2D.stats = texture.stats;
                }
                reglTexture2D.destroy = function () {
                    texture.decRef();
                };
                return reglTexture2D;
            }
            function createTextureCube(a0, a1, a2, a3, a4, a5) {
                var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP$1);
                textureSet[texture.id] = texture;
                stats.cubeCount++;
                var faces = new Array(6);
                function reglTextureCube(a0, a1, a2, a3, a4, a5) {
                    var i;
                    var texInfo = texture.texInfo;
                    TexInfo.call(texInfo);
                    for (i = 0; i < 6; ++i) {
                        faces[i] = allocMipMap();
                    }
                    if (typeof a0 === 'number' || !a0) {
                        var s = (a0 | 0) || 1;
                        for (i = 0; i < 6; ++i) {
                            parseMipMapFromShape(faces[i], s, s);
                        }
                    }
                    else if (typeof a0 === 'object') {
                        if (a1) {
                            parseMipMapFromObject(faces[0], a0);
                            parseMipMapFromObject(faces[1], a1);
                            parseMipMapFromObject(faces[2], a2);
                            parseMipMapFromObject(faces[3], a3);
                            parseMipMapFromObject(faces[4], a4);
                            parseMipMapFromObject(faces[5], a5);
                        }
                        else {
                            parseTexInfo(texInfo, a0);
                            parseFlags(texture, a0);
                            if ('faces' in a0) {
                                var faceInput = a0.faces;
                                check$1(Array.isArray(faceInput) && faceInput.length === 6, 'cube faces must be a length 6 array');
                                for (i = 0; i < 6; ++i) {
                                    check$1(typeof faceInput[i] === 'object' && !!faceInput[i], 'invalid input for cube map face');
                                    copyFlags(faces[i], texture);
                                    parseMipMapFromObject(faces[i], faceInput[i]);
                                }
                            }
                            else {
                                for (i = 0; i < 6; ++i) {
                                    parseMipMapFromObject(faces[i], a0);
                                }
                            }
                        }
                    }
                    else {
                        check$1.raise('invalid arguments to cube map');
                    }
                    copyFlags(texture, faces[0]);
                    check$1.optional(function () {
                        if (!limits.npotTextureCube) {
                            check$1(isPow2$1(texture.width) && isPow2$1(texture.height), 'your browser does not support non power or two texture dimensions');
                        }
                    });
                    if (texInfo.genMipmaps) {
                        texture.mipmask = (faces[0].width << 1) - 1;
                    }
                    else {
                        texture.mipmask = faces[0].mipmask;
                    }
                    check$1.textureCube(texture, texInfo, faces, limits);
                    texture.internalformat = faces[0].internalformat;
                    reglTextureCube.width = faces[0].width;
                    reglTextureCube.height = faces[0].height;
                    tempBind(texture);
                    for (i = 0; i < 6; ++i) {
                        setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i);
                    }
                    setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP$1);
                    tempRestore();
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, texInfo.genMipmaps, true);
                    }
                    reglTextureCube.format = textureFormatsInvert[texture.internalformat];
                    reglTextureCube.type = textureTypesInvert[texture.type];
                    reglTextureCube.mag = magFiltersInvert[texInfo.magFilter];
                    reglTextureCube.min = minFiltersInvert[texInfo.minFilter];
                    reglTextureCube.wrapS = wrapModesInvert[texInfo.wrapS];
                    reglTextureCube.wrapT = wrapModesInvert[texInfo.wrapT];
                    for (i = 0; i < 6; ++i) {
                        freeMipMap(faces[i]);
                    }
                    return reglTextureCube;
                }
                function subimage(face, image, x_, y_, level_) {
                    check$1(!!image, 'must specify image data');
                    check$1(typeof face === 'number' && face === (face | 0) &&
                        face >= 0 && face < 6, 'invalid face');
                    var x = x_ | 0;
                    var y = y_ | 0;
                    var level = level_ | 0;
                    var imageData = allocImage();
                    copyFlags(imageData, texture);
                    imageData.width = 0;
                    imageData.height = 0;
                    parseImage(imageData, image);
                    imageData.width = imageData.width || ((texture.width >> level) - x);
                    imageData.height = imageData.height || ((texture.height >> level) - y);
                    check$1(texture.type === imageData.type &&
                        texture.format === imageData.format &&
                        texture.internalformat === imageData.internalformat, 'incompatible format for texture.subimage');
                    check$1(x >= 0 && y >= 0 &&
                        x + imageData.width <= texture.width &&
                        y + imageData.height <= texture.height, 'texture.subimage write out of bounds');
                    check$1(texture.mipmask & (1 << level), 'missing mipmap data');
                    check$1(imageData.data || imageData.element || imageData.needsCopy, 'missing image data');
                    tempBind(texture);
                    setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + face, x, y, level);
                    tempRestore();
                    freeImage(imageData);
                    return reglTextureCube;
                }
                function resize(radius_) {
                    var radius = radius_ | 0;
                    if (radius === texture.width) {
                        return;
                    }
                    reglTextureCube.width = texture.width = radius;
                    reglTextureCube.height = texture.height = radius;
                    tempBind(texture);
                    for (var i = 0; i < 6; ++i) {
                        for (var j = 0; texture.mipmask >> j; ++j) {
                            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i, j, texture.format, radius >> j, radius >> j, 0, texture.format, texture.type, null);
                        }
                    }
                    tempRestore();
                    if (config.profile) {
                        texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, false, true);
                    }
                    return reglTextureCube;
                }
                reglTextureCube(a0, a1, a2, a3, a4, a5);
                reglTextureCube.subimage = subimage;
                reglTextureCube.resize = resize;
                reglTextureCube._reglType = 'textureCube';
                reglTextureCube._texture = texture;
                if (config.profile) {
                    reglTextureCube.stats = texture.stats;
                }
                reglTextureCube.destroy = function () {
                    texture.decRef();
                };
                return reglTextureCube;
            }
            // Called when regl is destroyed
            function destroyTextures() {
                for (var i = 0; i < numTexUnits; ++i) {
                    gl.activeTexture(GL_TEXTURE0$1 + i);
                    gl.bindTexture(GL_TEXTURE_2D$1, null);
                    textureUnits[i] = null;
                }
                values(textureSet).forEach(destroy);
                stats.cubeCount = 0;
                stats.textureCount = 0;
            }
            if (config.profile) {
                stats.getTotalTextureSize = function () {
                    var total = 0;
                    Object.keys(textureSet).forEach(function (key) {
                        total += textureSet[key].stats.size;
                    });
                    return total;
                };
            }
            function restoreTextures() {
                for (var i = 0; i < numTexUnits; ++i) {
                    var tex = textureUnits[i];
                    if (tex) {
                        tex.bindCount = 0;
                        tex.unit = -1;
                        textureUnits[i] = null;
                    }
                }
                values(textureSet).forEach(function (texture) {
                    texture.texture = gl.createTexture();
                    gl.bindTexture(texture.target, texture.texture);
                    for (var i = 0; i < 32; ++i) {
                        if ((texture.mipmask & (1 << i)) === 0) {
                            continue;
                        }
                        if (texture.target === GL_TEXTURE_2D$1) {
                            gl.texImage2D(GL_TEXTURE_2D$1, i, texture.internalformat, texture.width >> i, texture.height >> i, 0, texture.internalformat, texture.type, null);
                        }
                        else {
                            for (var j = 0; j < 6; ++j) {
                                gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + j, i, texture.internalformat, texture.width >> i, texture.height >> i, 0, texture.internalformat, texture.type, null);
                            }
                        }
                    }
                    setTexInfo(texture.texInfo, texture.target);
                });
            }
            function refreshTextures() {
                for (var i = 0; i < numTexUnits; ++i) {
                    var tex = textureUnits[i];
                    if (tex) {
                        tex.bindCount = 0;
                        tex.unit = -1;
                        textureUnits[i] = null;
                    }
                    gl.activeTexture(GL_TEXTURE0$1 + i);
                    gl.bindTexture(GL_TEXTURE_2D$1, null);
                    gl.bindTexture(GL_TEXTURE_CUBE_MAP$1, null);
                }
            }
            return {
                create2D: createTexture2D,
                createCube: createTextureCube,
                clear: destroyTextures,
                getTexture: function (wrapper) {
                    return null;
                },
                restore: restoreTextures,
                refresh: refreshTextures
            };
        }