function wrapFBOState(gl, extensions, limits, textureState, renderbufferState, stats) {
                function reglFramebuffer(a, b) {
                    var i;
                    check$1(framebufferState.next !== framebuffer, 'can not update framebuffer which is currently in use');
                    var width = 0;
                    var height = 0;
                    var needsDepth = true;
                    var needsStencil = true;
                    var colorBuffer = null;
                    var colorTexture = true;
                    var colorFormat = 'rgba';
                    var colorType = 'uint8';
                    var colorCount = 1;
                    var depthBuffer = null;
                    var stencilBuffer = null;
                    var depthStencilBuffer = null;
                    var depthStencilTexture = false;
                    if (typeof a === 'number') {
                        width = a | 0;
                        height = (b | 0) || width;
                    }
                    else if (!a) {
                        width = height = 1;
                    }
                    else {
                        check$1.type(a, 'object', 'invalid arguments for framebuffer');
                        var options = a;
                        if ('shape' in options) {
                            var shape = options.shape;
                            check$1(Array.isArray(shape) && shape.length >= 2, 'invalid shape for framebuffer');
                            width = shape[0];
                            height = shape[1];
                        }
                        else {
                            if ('radius' in options) {
                                width = height = options.radius;
                            }
                            if ('width' in options) {
                                width = options.width;
                            }
                            if ('height' in options) {
                                height = options.height;
                            }
                        }
                        if ('color' in options ||
                            'colors' in options) {
                            colorBuffer =
                                options.color ||
                                    options.colors;
                            if (Array.isArray(colorBuffer)) {
                                check$1(colorBuffer.length === 1 || extensions.webgl_draw_buffers, 'multiple render targets not supported');
                            }
                        }
                        if (!colorBuffer) {
                            if ('colorCount' in options) {
                                colorCount = options.colorCount | 0;
                                check$1(colorCount > 0, 'invalid color buffer count');
                            }
                            if ('colorTexture' in options) {
                                colorTexture = !!options.colorTexture;
                                colorFormat = 'rgba4';
                            }
                            if ('colorType' in options) {
                                colorType = options.colorType;
                                if (!colorTexture) {
                                    if (colorType === 'half float' || colorType === 'float16') {
                                        check$1(extensions.ext_color_buffer_half_float, 'you must enable EXT_color_buffer_half_float to use 16-bit render buffers');
                                        colorFormat = 'rgba16f';
                                    }
                                    else if (colorType === 'float' || colorType === 'float32') {
                                        check$1(extensions.webgl_color_buffer_float, 'you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers');
                                        colorFormat = 'rgba32f';
                                    }
                                }
                                else {
                                    check$1(extensions.oes_texture_float ||
                                        !(colorType === 'float' || colorType === 'float32'), 'you must enable OES_texture_float in order to use floating point framebuffer objects');
                                    check$1(extensions.oes_texture_half_float ||
                                        !(colorType === 'half float' || colorType === 'float16'), 'you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects');
                                }
                                check$1.oneOf(colorType, colorTypes, 'invalid color type');
                            }
                            if ('colorFormat' in options) {
                                colorFormat = options.colorFormat;
                                if (colorTextureFormats.indexOf(colorFormat) >= 0) {
                                    colorTexture = true;
                                }
                                else if (colorRenderbufferFormats.indexOf(colorFormat) >= 0) {
                                    colorTexture = false;
                                }
                                else {
                                    check$1.optional(function () {
                                        if (colorTexture) {
                                            check$1.oneOf(options.colorFormat, colorTextureFormats, 'invalid color format for texture');
                                        }
                                        else {
                                            check$1.oneOf(options.colorFormat, colorRenderbufferFormats, 'invalid color format for renderbuffer');
                                        }
                                    });
                                }
                            }
                        }
                        if ('depthTexture' in options || 'depthStencilTexture' in options) {
                            depthStencilTexture = !!(options.depthTexture ||
                                options.depthStencilTexture);
                            check$1(!depthStencilTexture || extensions.webgl_depth_texture, 'webgl_depth_texture extension not supported');
                        }
                        if ('depth' in options) {
                            if (typeof options.depth === 'boolean') {
                                needsDepth = options.depth;
                            }
                            else {
                                depthBuffer = options.depth;
                                needsStencil = false;
                            }
                        }
                        if ('stencil' in options) {
                            if (typeof options.stencil === 'boolean') {
                                needsStencil = options.stencil;
                            }
                            else {
                                stencilBuffer = options.stencil;
                                needsDepth = false;
                            }
                        }
                        if ('depthStencil' in options) {
                            if (typeof options.depthStencil === 'boolean') {
                                needsDepth = needsStencil = options.depthStencil;
                            }
                            else {
                                depthStencilBuffer = options.depthStencil;
                                needsDepth = false;
                                needsStencil = false;
                            }
                        }
                    }
                    // parse attachments
                    var colorAttachments = null;
                    var depthAttachment = null;
                    var stencilAttachment = null;
                    var depthStencilAttachment = null;
                    // Set up color attachments
                    if (Array.isArray(colorBuffer)) {
                        colorAttachments = colorBuffer.map(parseAttachment);
                    }
                    else if (colorBuffer) {
                        colorAttachments = [parseAttachment(colorBuffer)];
                    }
                    else {
                        colorAttachments = new Array(colorCount);
                        for (i = 0; i < colorCount; ++i) {
                            colorAttachments[i] = allocAttachment(width, height, colorTexture, colorFormat, colorType);
                        }
                    }
                    check$1(extensions.webgl_draw_buffers || colorAttachments.length <= 1, 'you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers.');
                    check$1(colorAttachments.length <= limits.maxColorAttachments, 'too many color attachments, not supported');
                    width = width || colorAttachments[0].width;
                    height = height || colorAttachments[0].height;
                    if (depthBuffer) {
                        depthAttachment = parseAttachment(depthBuffer);
                    }
                    else if (needsDepth && !needsStencil) {
                        depthAttachment = allocAttachment(width, height, depthStencilTexture, 'depth', 'uint32');
                    }
                    if (stencilBuffer) {
                        stencilAttachment = parseAttachment(stencilBuffer);
                    }
                    else if (needsStencil && !needsDepth) {
                        stencilAttachment = allocAttachment(width, height, false, 'stencil', 'uint8');
                    }
                    if (depthStencilBuffer) {
                        depthStencilAttachment = parseAttachment(depthStencilBuffer);
                    }
                    else if (!depthBuffer && !stencilBuffer && needsStencil && needsDepth) {
                        depthStencilAttachment = allocAttachment(width, height, depthStencilTexture, 'depth stencil', 'depth stencil');
                    }
                    check$1((!!depthBuffer) + (!!stencilBuffer) + (!!depthStencilBuffer) <= 1, 'invalid framebuffer configuration, can specify exactly one depth/stencil attachment');
                    var commonColorAttachmentSize = null;
                    for (i = 0; i < colorAttachments.length; ++i) {
                        incRefAndCheckShape(colorAttachments[i], width, height);
                        check$1(!colorAttachments[i] ||
                            (colorAttachments[i].texture &&
                                colorTextureFormatEnums.indexOf(colorAttachments[i].texture._texture.format) >= 0) ||
                            (colorAttachments[i].renderbuffer &&
                                colorRenderbufferFormatEnums.indexOf(colorAttachments[i].renderbuffer._renderbuffer.format) >= 0), 'framebuffer color attachment ' + i + ' is invalid');
                        if (colorAttachments[i] && colorAttachments[i].texture) {
                            var colorAttachmentSize = textureFormatChannels[colorAttachments[i].texture._texture.format] *
                                textureTypeSizes[colorAttachments[i].texture._texture.type];
                            if (commonColorAttachmentSize === null) {
                                commonColorAttachmentSize = colorAttachmentSize;
                            }
                            else {
                                // We need to make sure that all color attachments have the same number of bitplanes
                                // (that is, the same numer of bits per pixel)
                                // This is required by the GLES2.0 standard. See the beginning of Chapter 4 in that document.
                                check$1(commonColorAttachmentSize === colorAttachmentSize, 'all color attachments much have the same number of bits per pixel.');
                            }
                        }
                    }
                    incRefAndCheckShape(depthAttachment, width, height);
                    check$1(!depthAttachment ||
                        (depthAttachment.texture &&
                            depthAttachment.texture._texture.format === GL_DEPTH_COMPONENT$1) ||
                        (depthAttachment.renderbuffer &&
                            depthAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_COMPONENT16$1), 'invalid depth attachment for framebuffer object');
                    incRefAndCheckShape(stencilAttachment, width, height);
                    check$1(!stencilAttachment ||
                        (stencilAttachment.renderbuffer &&
                            stencilAttachment.renderbuffer._renderbuffer.format === GL_STENCIL_INDEX8$1), 'invalid stencil attachment for framebuffer object');
                    incRefAndCheckShape(depthStencilAttachment, width, height);
                    check$1(!depthStencilAttachment ||
                        (depthStencilAttachment.texture &&
                            depthStencilAttachment.texture._texture.format === GL_DEPTH_STENCIL$2) ||
                        (depthStencilAttachment.renderbuffer &&
                            depthStencilAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_STENCIL$2), 'invalid depth-stencil attachment for framebuffer object');
                    // decrement references
                    decFBORefs(framebuffer);
                    framebuffer.width = width;
                    framebuffer.height = height;
                    framebuffer.colorAttachments = colorAttachments;
                    framebuffer.depthAttachment = depthAttachment;
                    framebuffer.stencilAttachment = stencilAttachment;
                    framebuffer.depthStencilAttachment = depthStencilAttachment;
                    reglFramebuffer.color = colorAttachments.map(unwrapAttachment);
                    reglFramebuffer.depth = unwrapAttachment(depthAttachment);
                    reglFramebuffer.stencil = unwrapAttachment(stencilAttachment);
                    reglFramebuffer.depthStencil = unwrapAttachment(depthStencilAttachment);
                    reglFramebuffer.width = framebuffer.width;
                    reglFramebuffer.height = framebuffer.height;
                    updateFramebuffer(framebuffer);
                    return reglFramebuffer;
                }
                function reglFramebufferCube(a) {
                    var i;
                    check$1(faces.indexOf(framebufferState.next) < 0, 'can not update framebuffer which is currently in use');
                    var params = {
                        color: null
                    };
                    var radius = 0;
                    var colorBuffer = null;
                    var colorFormat = 'rgba';
                    var colorType = 'uint8';
                    var colorCount = 1;
                    if (typeof a === 'number') {
                        radius = a | 0;
                    }
                    else if (!a) {
                        radius = 1;
                    }
                    else {
                        check$1.type(a, 'object', 'invalid arguments for framebuffer');
                        var options = a;
                        if ('shape' in options) {
                            var shape = options.shape;
                            check$1(Array.isArray(shape) && shape.length >= 2, 'invalid shape for framebuffer');
                            check$1(shape[0] === shape[1], 'cube framebuffer must be square');
                            radius = shape[0];
                        }
                        else {
                            if ('radius' in options) {
                                radius = options.radius | 0;
                            }
                            if ('width' in options) {
                                radius = options.width | 0;
                                if ('height' in options) {
                                    check$1(options.height === radius, 'must be square');
                                }
                            }
                            else if ('height' in options) {
                                radius = options.height | 0;
                            }
                        }
                        if ('color' in options ||
                            'colors' in options) {
                            colorBuffer =
                                options.color ||
                                    options.colors;
                            if (Array.isArray(colorBuffer)) {
                                check$1(colorBuffer.length === 1 || extensions.webgl_draw_buffers, 'multiple render targets not supported');
                            }
                        }
                        if (!colorBuffer) {
                            if ('colorCount' in options) {
                                colorCount = options.colorCount | 0;
                                check$1(colorCount > 0, 'invalid color buffer count');
                            }
                            if ('colorType' in options) {
                                check$1.oneOf(options.colorType, colorTypes, 'invalid color type');
                                colorType = options.colorType;
                            }
                            if ('colorFormat' in options) {
                                colorFormat = options.colorFormat;
                                check$1.oneOf(options.colorFormat, colorTextureFormats, 'invalid color format for texture');
                            }
                        }
                        if ('depth' in options) {
                            params.depth = options.depth;
                        }
                        if ('stencil' in options) {
                            params.stencil = options.stencil;
                        }
                        if ('depthStencil' in options) {
                            params.depthStencil = options.depthStencil;
                        }
                    }
                    var colorCubes;
                    if (colorBuffer) {
                        if (Array.isArray(colorBuffer)) {
                            colorCubes = [];
                            for (i = 0; i < colorBuffer.length; ++i) {
                                colorCubes[i] = colorBuffer[i];
                            }
                        }
                        else {
                            colorCubes = [colorBuffer];
                        }
                    }
                    else {
                        colorCubes = Array(colorCount);
                        var cubeMapParams = {
                            radius: radius,
                            format: colorFormat,
                            type: colorType
                        };
                        for (i = 0; i < colorCount; ++i) {
                            colorCubes[i] = textureState.createCube(cubeMapParams);
                        }
                    }
                    // Check color cubes
                    params.color = Array(colorCubes.length);
                    for (i = 0; i < colorCubes.length; ++i) {
                        var cube = colorCubes[i];
                        check$1(typeof cube === 'function' && cube._reglType === 'textureCube', 'invalid cube map');
                        radius = radius || cube.width;
                        check$1(cube.width === radius && cube.height === radius, 'invalid cube map shape');
                        params.color[i] = {
                            target: GL_TEXTURE_CUBE_MAP_POSITIVE_X$2,
                            data: colorCubes[i]
                        };
                    }
                    for (i = 0; i < 6; ++i) {
                        for (var j = 0; j < colorCubes.length; ++j) {
                            params.color[j].target = GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + i;
                        }
                        // reuse depth-stencil attachments across all cube maps
                        if (i > 0) {
                            params.depth = faces[0].depth;
                            params.stencil = faces[0].stencil;
                            params.depthStencil = faces[0].depthStencil;
                        }
                        if (faces[i]) {
                            (faces[i])(params);
                        }
                        else {
                            faces[i] = createFBO(params);
                        }
                    }
                    return extend(reglFramebufferCube, {
                        width: radius,
                        height: radius,
                        color: colorCubes
                    });
                }