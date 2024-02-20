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