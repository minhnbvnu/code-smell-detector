function reglCore(gl, stringStore, extensions, limits, bufferState, elementState, textureState, framebufferState, uniformState, attributeState, shaderState, drawState, contextState, timer, config) {
                GL_STATE_NAMES.forEach(function (prop) {
                    var param = propName(prop);
                    function parseParam(parseStatic, parseDynamic) {
                        if (prop in staticOptions) {
                            var value = parseStatic(staticOptions[prop]);
                            STATE[param] = createStaticDecl(function () {
                                return value;
                            });
                        }
                        else if (prop in dynamicOptions) {
                            var dyn = dynamicOptions[prop];
                            STATE[param] = createDynamicDecl(dyn, function (env, scope) {
                                return parseDynamic(env, scope, env.invoke(scope, dyn));
                            });
                        }
                    }
                    switch (prop) {
                        case S_CULL_ENABLE:
                        case S_BLEND_ENABLE:
                        case S_DITHER:
                        case S_STENCIL_ENABLE:
                        case S_DEPTH_ENABLE:
                        case S_SCISSOR_ENABLE:
                        case S_POLYGON_OFFSET_ENABLE:
                        case S_SAMPLE_ALPHA:
                        case S_SAMPLE_ENABLE:
                        case S_DEPTH_MASK:
                            return parseParam(function (value) {
                                check$1.commandType(value, 'boolean', prop, env.commandStr);
                                return value;
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, 'typeof ' + value + '==="boolean"', 'invalid flag ' + prop, env.commandStr);
                                });
                                return value;
                            });
                        case S_DEPTH_FUNC:
                            return parseParam(function (value) {
                                check$1.commandParameter(value, compareFuncs, 'invalid ' + prop, env.commandStr);
                                return compareFuncs[value];
                            }, function (env, scope, value) {
                                var COMPARE_FUNCS = env.constants.compareFuncs;
                                check$1.optional(function () {
                                    env.assert(scope, value + ' in ' + COMPARE_FUNCS, 'invalid ' + prop + ', must be one of ' + Object.keys(compareFuncs));
                                });
                                return scope.def(COMPARE_FUNCS, '[', value, ']');
                            });
                        case S_DEPTH_RANGE:
                            return parseParam(function (value) {
                                check$1.command(isArrayLike(value) &&
                                    value.length === 2 &&
                                    typeof value[0] === 'number' &&
                                    typeof value[1] === 'number' &&
                                    value[0] <= value[1], 'depth range is 2d array', env.commandStr);
                                return value;
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, env.shared.isArrayLike + '(' + value + ')&&' +
                                        value + '.length===2&&' +
                                        'typeof ' + value + '[0]==="number"&&' +
                                        'typeof ' + value + '[1]==="number"&&' +
                                        value + '[0]<=' + value + '[1]', 'depth range must be a 2d array');
                                });
                                var Z_NEAR = scope.def('+', value, '[0]');
                                var Z_FAR = scope.def('+', value, '[1]');
                                return [Z_NEAR, Z_FAR];
                            });
                        case S_BLEND_FUNC:
                            return parseParam(function (value) {
                                check$1.commandType(value, 'object', 'blend.func', env.commandStr);
                                var srcRGB = ('srcRGB' in value ? value.srcRGB : value.src);
                                var srcAlpha = ('srcAlpha' in value ? value.srcAlpha : value.src);
                                var dstRGB = ('dstRGB' in value ? value.dstRGB : value.dst);
                                var dstAlpha = ('dstAlpha' in value ? value.dstAlpha : value.dst);
                                check$1.commandParameter(srcRGB, blendFuncs, param + '.srcRGB', env.commandStr);
                                check$1.commandParameter(srcAlpha, blendFuncs, param + '.srcAlpha', env.commandStr);
                                check$1.commandParameter(dstRGB, blendFuncs, param + '.dstRGB', env.commandStr);
                                check$1.commandParameter(dstAlpha, blendFuncs, param + '.dstAlpha', env.commandStr);
                                check$1.command((invalidBlendCombinations.indexOf(srcRGB + ', ' + dstRGB) === -1), 'unallowed blending combination (srcRGB, dstRGB) = (' + srcRGB + ', ' + dstRGB + ')', env.commandStr);
                                return [
                                    blendFuncs[srcRGB],
                                    blendFuncs[dstRGB],
                                    blendFuncs[srcAlpha],
                                    blendFuncs[dstAlpha]
                                ];
                            }, function (env, scope, value) {
                                var BLEND_FUNCS = env.constants.blendFuncs;
                                check$1.optional(function () {
                                    env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid blend func, must be an object');
                                });
                                function read(prefix, suffix) {
                                    var func = scope.def('"', prefix, suffix, '" in ', value, '?', value, '.', prefix, suffix, ':', value, '.', prefix);
                                    check$1.optional(function () {
                                        env.assert(scope, func + ' in ' + BLEND_FUNCS, 'invalid ' + prop + '.' + prefix + suffix + ', must be one of ' + Object.keys(blendFuncs));
                                    });
                                    return func;
                                }
                                var srcRGB = read('src', 'RGB');
                                var dstRGB = read('dst', 'RGB');
                                check$1.optional(function () {
                                    var INVALID_BLEND_COMBINATIONS = env.constants.invalidBlendCombinations;
                                    env.assert(scope, INVALID_BLEND_COMBINATIONS +
                                        '.indexOf(' + srcRGB + '+", "+' + dstRGB + ') === -1 ', 'unallowed blending combination for (srcRGB, dstRGB)');
                                });
                                var SRC_RGB = scope.def(BLEND_FUNCS, '[', srcRGB, ']');
                                var SRC_ALPHA = scope.def(BLEND_FUNCS, '[', read('src', 'Alpha'), ']');
                                var DST_RGB = scope.def(BLEND_FUNCS, '[', dstRGB, ']');
                                var DST_ALPHA = scope.def(BLEND_FUNCS, '[', read('dst', 'Alpha'), ']');
                                return [SRC_RGB, DST_RGB, SRC_ALPHA, DST_ALPHA];
                            });
                        case S_BLEND_EQUATION:
                            return parseParam(function (value) {
                                if (typeof value === 'string') {
                                    check$1.commandParameter(value, blendEquations, 'invalid ' + prop, env.commandStr);
                                    return [
                                        blendEquations[value],
                                        blendEquations[value]
                                    ];
                                }
                                else if (typeof value === 'object') {
                                    check$1.commandParameter(value.rgb, blendEquations, prop + '.rgb', env.commandStr);
                                    check$1.commandParameter(value.alpha, blendEquations, prop + '.alpha', env.commandStr);
                                    return [
                                        blendEquations[value.rgb],
                                        blendEquations[value.alpha]
                                    ];
                                }
                                else {
                                    check$1.commandRaise('invalid blend.equation', env.commandStr);
                                }
                            }, function (env, scope, value) {
                                var BLEND_EQUATIONS = env.constants.blendEquations;
                                var RGB = scope.def();
                                var ALPHA = scope.def();
                                var ifte = env.cond('typeof ', value, '==="string"');
                                check$1.optional(function () {
                                    function checkProp(block, name, value) {
                                        env.assert(block, value + ' in ' + BLEND_EQUATIONS, 'invalid ' + name + ', must be one of ' + Object.keys(blendEquations));
                                    }
                                    checkProp(ifte.then, prop, value);
                                    env.assert(ifte.else, value + '&&typeof ' + value + '==="object"', 'invalid ' + prop);
                                    checkProp(ifte.else, prop + '.rgb', value + '.rgb');
                                    checkProp(ifte.else, prop + '.alpha', value + '.alpha');
                                });
                                ifte.then(RGB, '=', ALPHA, '=', BLEND_EQUATIONS, '[', value, '];');
                                ifte.else(RGB, '=', BLEND_EQUATIONS, '[', value, '.rgb];', ALPHA, '=', BLEND_EQUATIONS, '[', value, '.alpha];');
                                scope(ifte);
                                return [RGB, ALPHA];
                            });
                        case S_BLEND_COLOR:
                            return parseParam(function (value) {
                                check$1.command(isArrayLike(value) &&
                                    value.length === 4, 'blend.color must be a 4d array', env.commandStr);
                                return loop(4, function (i) {
                                    return +value[i];
                                });
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, env.shared.isArrayLike + '(' + value + ')&&' +
                                        value + '.length===4', 'blend.color must be a 4d array');
                                });
                                return loop(4, function (i) {
                                    return scope.def('+', value, '[', i, ']');
                                });
                            });
                        case S_STENCIL_MASK:
                            return parseParam(function (value) {
                                check$1.commandType(value, 'number', param, env.commandStr);
                                return value | 0;
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, 'typeof ' + value + '==="number"', 'invalid stencil.mask');
                                });
                                return scope.def(value, '|0');
                            });
                        case S_STENCIL_FUNC:
                            return parseParam(function (value) {
                                check$1.commandType(value, 'object', param, env.commandStr);
                                var cmp = value.cmp || 'keep';
                                var ref = value.ref || 0;
                                var mask = 'mask' in value ? value.mask : -1;
                                check$1.commandParameter(cmp, compareFuncs, prop + '.cmp', env.commandStr);
                                check$1.commandType(ref, 'number', prop + '.ref', env.commandStr);
                                check$1.commandType(mask, 'number', prop + '.mask', env.commandStr);
                                return [
                                    compareFuncs[cmp],
                                    ref,
                                    mask
                                ];
                            }, function (env, scope, value) {
                                var COMPARE_FUNCS = env.constants.compareFuncs;
                                check$1.optional(function () {
                                    function assert() {
                                        env.assert(scope, Array.prototype.join.call(arguments, ''), 'invalid stencil.func');
                                    }
                                    assert(value + '&&typeof ', value, '==="object"');
                                    assert('!("cmp" in ', value, ')||(', value, '.cmp in ', COMPARE_FUNCS, ')');
                                });
                                var cmp = scope.def('"cmp" in ', value, '?', COMPARE_FUNCS, '[', value, '.cmp]', ':', GL_KEEP);
                                var ref = scope.def(value, '.ref|0');
                                var mask = scope.def('"mask" in ', value, '?', value, '.mask|0:-1');
                                return [cmp, ref, mask];
                            });
                        case S_STENCIL_OPFRONT:
                        case S_STENCIL_OPBACK:
                            return parseParam(function (value) {
                                check$1.commandType(value, 'object', param, env.commandStr);
                                var fail = value.fail || 'keep';
                                var zfail = value.zfail || 'keep';
                                var zpass = value.zpass || 'keep';
                                check$1.commandParameter(fail, stencilOps, prop + '.fail', env.commandStr);
                                check$1.commandParameter(zfail, stencilOps, prop + '.zfail', env.commandStr);
                                check$1.commandParameter(zpass, stencilOps, prop + '.zpass', env.commandStr);
                                return [
                                    prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                                    stencilOps[fail],
                                    stencilOps[zfail],
                                    stencilOps[zpass]
                                ];
                            }, function (env, scope, value) {
                                var STENCIL_OPS = env.constants.stencilOps;
                                check$1.optional(function () {
                                    env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid ' + prop);
                                });
                                function read(name) {
                                    check$1.optional(function () {
                                        env.assert(scope, '!("' + name + '" in ' + value + ')||' +
                                            '(' + value + '.' + name + ' in ' + STENCIL_OPS + ')', 'invalid ' + prop + '.' + name + ', must be one of ' + Object.keys(stencilOps));
                                    });
                                    return scope.def('"', name, '" in ', value, '?', STENCIL_OPS, '[', value, '.', name, ']:', GL_KEEP);
                                }
                                return [
                                    prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                                    read('fail'),
                                    read('zfail'),
                                    read('zpass')
                                ];
                            });
                        case S_POLYGON_OFFSET_OFFSET:
                            return parseParam(function (value) {
                                check$1.commandType(value, 'object', param, env.commandStr);
                                var factor = value.factor | 0;
                                var units = value.units | 0;
                                check$1.commandType(factor, 'number', param + '.factor', env.commandStr);
                                check$1.commandType(units, 'number', param + '.units', env.commandStr);
                                return [factor, units];
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid ' + prop);
                                });
                                var FACTOR = scope.def(value, '.factor|0');
                                var UNITS = scope.def(value, '.units|0');
                                return [FACTOR, UNITS];
                            });
                        case S_CULL_FACE:
                            return parseParam(function (value) {
                                var face = 0;
                                if (value === 'front') {
                                    face = GL_FRONT;
                                }
                                else if (value === 'back') {
                                    face = GL_BACK;
                                }
                                check$1.command(!!face, param, env.commandStr);
                                return face;
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, value + '==="front"||' +
                                        value + '==="back"', 'invalid cull.face');
                                });
                                return scope.def(value, '==="front"?', GL_FRONT, ':', GL_BACK);
                            });
                        case S_LINE_WIDTH:
                            return parseParam(function (value) {
                                check$1.command(typeof value === 'number' &&
                                    value >= limits.lineWidthDims[0] &&
                                    value <= limits.lineWidthDims[1], 'invalid line width, must be a positive number between ' +
                                    limits.lineWidthDims[0] + ' and ' + limits.lineWidthDims[1], env.commandStr);
                                return value;
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, 'typeof ' + value + '==="number"&&' +
                                        value + '>=' + limits.lineWidthDims[0] + '&&' +
                                        value + '<=' + limits.lineWidthDims[1], 'invalid line width');
                                });
                                return value;
                            });
                        case S_FRONT_FACE:
                            return parseParam(function (value) {
                                check$1.commandParameter(value, orientationType, param, env.commandStr);
                                return orientationType[value];
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, value + '==="cw"||' +
                                        value + '==="ccw"', 'invalid frontFace, must be one of cw,ccw');
                                });
                                return scope.def(value + '==="cw"?' + GL_CW + ':' + GL_CCW);
                            });
                        case S_COLOR_MASK:
                            return parseParam(function (value) {
                                check$1.command(isArrayLike(value) && value.length === 4, 'color.mask must be length 4 array', env.commandStr);
                                return value.map(function (v) { return !!v; });
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, env.shared.isArrayLike + '(' + value + ')&&' +
                                        value + '.length===4', 'invalid color.mask');
                                });
                                return loop(4, function (i) {
                                    return '!!' + value + '[' + i + ']';
                                });
                            });
                        case S_SAMPLE_COVERAGE:
                            return parseParam(function (value) {
                                check$1.command(typeof value === 'object' && value, param, env.commandStr);
                                var sampleValue = 'value' in value ? value.value : 1;
                                var sampleInvert = !!value.invert;
                                check$1.command(typeof sampleValue === 'number' &&
                                    sampleValue >= 0 && sampleValue <= 1, 'sample.coverage.value must be a number between 0 and 1', env.commandStr);
                                return [sampleValue, sampleInvert];
                            }, function (env, scope, value) {
                                check$1.optional(function () {
                                    env.assert(scope, value + '&&typeof ' + value + '==="object"', 'invalid sample.coverage');
                                });
                                var VALUE = scope.def('"value" in ', value, '?+', value, '.value:1');
                                var INVERT = scope.def('!!', value, '.invert');
                                return [VALUE, INVERT];
                            });
                    }
                });
            function emitUniforms(env, scope, args, uniforms, filter, isBatchInnerLoop) {
                var shared = env.shared;
                var GL = shared.gl;
                var definedArrUniforms = {};
                var infix;
                for (var i = 0; i < uniforms.length; ++i) {
                    var uniform = uniforms[i];
                    var name = uniform.name;
                    var type = uniform.info.type;
                    var size = uniform.info.size;
                    var arg = args.uniforms[name];
                    if (size > 1) {
                        // either foo[n] or foos, avoid define both
                        if (!arg) {
                            continue;
                        }
                        var arrUniformName = name.replace('[0]', '');
                        if (definedArrUniforms[arrUniformName]) {
                            continue;
                        }
                        definedArrUniforms[arrUniformName] = 1;
                    }
                    var UNIFORM = env.link(uniform);
                    var LOCATION = UNIFORM + '.location';
                    var VALUE;
                    if (arg) {
                        if (!filter(arg)) {
                            continue;
                        }
                        if (isStatic(arg)) {
                            var value = arg.value;
                            check$1.command(value !== null && typeof value !== 'undefined', 'missing uniform "' + name + '"', env.commandStr);
                            if (type === GL_SAMPLER_2D || type === GL_SAMPLER_CUBE) {
                                check$1.command(typeof value === 'function' &&
                                    ((type === GL_SAMPLER_2D &&
                                        (value._reglType === 'texture2d' ||
                                            value._reglType === 'framebuffer')) ||
                                        (type === GL_SAMPLER_CUBE &&
                                            (value._reglType === 'textureCube' ||
                                                value._reglType === 'framebufferCube'))), 'invalid texture for uniform ' + name, env.commandStr);
                                var TEX_VALUE = env.link(value._texture || value.color[0]._texture);
                                scope(GL, '.uniform1i(', LOCATION, ',', TEX_VALUE + '.bind());');
                                scope.exit(TEX_VALUE, '.unbind();');
                            }
                            else if (type === GL_FLOAT_MAT2 ||
                                type === GL_FLOAT_MAT3 ||
                                type === GL_FLOAT_MAT4) {
                                check$1.optional(function () {
                                    check$1.command(isArrayLike(value), 'invalid matrix for uniform ' + name, env.commandStr);
                                    check$1.command((type === GL_FLOAT_MAT2 && value.length === 4) ||
                                        (type === GL_FLOAT_MAT3 && value.length === 9) ||
                                        (type === GL_FLOAT_MAT4 && value.length === 16), 'invalid length for matrix uniform ' + name, env.commandStr);
                                });
                                var MAT_VALUE = env.global.def('new Float32Array([' +
                                    Array.prototype.slice.call(value) + '])');
                                var dim = 2;
                                if (type === GL_FLOAT_MAT3) {
                                    dim = 3;
                                }
                                else if (type === GL_FLOAT_MAT4) {
                                    dim = 4;
                                }
                                scope(GL, '.uniformMatrix', dim, 'fv(', LOCATION, ',false,', MAT_VALUE, ');');
                            }
                            else {
                                switch (type) {
                                    case GL_FLOAT$8:
                                        if (size === 1) {
                                            check$1.commandType(value, 'number', 'uniform ' + name, env.commandStr);
                                        }
                                        else {
                                            check$1.command(isArrayLike(value) && (value.length === size), 'uniform ' + name, env.commandStr);
                                        }
                                        infix = '1f';
                                        break;
                                    case GL_FLOAT_VEC2:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2), 'uniform ' + name, env.commandStr);
                                        infix = '2f';
                                        break;
                                    case GL_FLOAT_VEC3:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3), 'uniform ' + name, env.commandStr);
                                        infix = '3f';
                                        break;
                                    case GL_FLOAT_VEC4:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4), 'uniform ' + name, env.commandStr);
                                        infix = '4f';
                                        break;
                                    case GL_BOOL:
                                        if (size === 1) {
                                            check$1.commandType(value, 'boolean', 'uniform ' + name, env.commandStr);
                                        }
                                        else {
                                            check$1.command(isArrayLike(value) && (value.length === size), 'uniform ' + name, env.commandStr);
                                        }
                                        infix = '1i';
                                        break;
                                    case GL_INT$3:
                                        if (size === 1) {
                                            check$1.commandType(value, 'number', 'uniform ' + name, env.commandStr);
                                        }
                                        else {
                                            check$1.command(isArrayLike(value) && (value.length === size), 'uniform ' + name, env.commandStr);
                                        }
                                        infix = '1i';
                                        break;
                                    case GL_BOOL_VEC2:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2), 'uniform ' + name, env.commandStr);
                                        infix = '2i';
                                        break;
                                    case GL_INT_VEC2:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2), 'uniform ' + name, env.commandStr);
                                        infix = '2i';
                                        break;
                                    case GL_BOOL_VEC3:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3), 'uniform ' + name, env.commandStr);
                                        infix = '3i';
                                        break;
                                    case GL_INT_VEC3:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3), 'uniform ' + name, env.commandStr);
                                        infix = '3i';
                                        break;
                                    case GL_BOOL_VEC4:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4), 'uniform ' + name, env.commandStr);
                                        infix = '4i';
                                        break;
                                    case GL_INT_VEC4:
                                        check$1.command(isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4), 'uniform ' + name, env.commandStr);
                                        infix = '4i';
                                        break;
                                }
                                if (size > 1) {
                                    infix += 'v';
                                    value = env.global.def('[' +
                                        Array.prototype.slice.call(value) + ']');
                                }
                                else {
                                    value = isArrayLike(value) ? Array.prototype.slice.call(value) : value;
                                }
                                scope(GL, '.uniform', infix, '(', LOCATION, ',', value, ');');
                            }
                            continue;
                        }
                        else {
                            VALUE = arg.append(env, scope);
                        }
                    }
                    else {
                        if (!filter(SCOPE_DECL)) {
                            continue;
                        }
                        VALUE = scope.def(shared.uniforms, '[', stringStore.id(name), ']');
                    }
                    if (type === GL_SAMPLER_2D) {
                        check$1(!Array.isArray(VALUE), 'must specify a scalar prop for textures');
                        scope('if(', VALUE, '&&', VALUE, '._reglType==="framebuffer"){', VALUE, '=', VALUE, '.color[0];', '}');
                    }
                    else if (type === GL_SAMPLER_CUBE) {
                        check$1(!Array.isArray(VALUE), 'must specify a scalar prop for cube maps');
                        scope('if(', VALUE, '&&', VALUE, '._reglType==="framebufferCube"){', VALUE, '=', VALUE, '.color[0];', '}');
                    }
                    // perform type validation
                    check$1.optional(function () {
                        function emitCheck(pred, message) {
                            env.assert(scope, pred, 'bad data or missing for uniform "' + name + '".  ' + message);
                        }
                        function checkType(type, size) {
                            if (size === 1) {
                                check$1(!Array.isArray(VALUE), 'must not specify an array type for uniform');
                            }
                            emitCheck('Array.isArray(' + VALUE + ') && typeof ' + VALUE + '[0]===" ' + type + '"' +
                                ' || typeof ' + VALUE + '==="' + type + '"', 'invalid type, expected ' + type);
                        }
                        function checkVector(n, type, size) {
                            if (Array.isArray(VALUE)) {
                                check$1(VALUE.length && VALUE.length % n === 0 && VALUE.length <= n * size, 'must have length of ' + (size === 1 ? '' : 'n * ') + n);
                            }
                            else {
                                emitCheck(shared.isArrayLike + '(' + VALUE + ')&&' + VALUE + '.length && ' + VALUE + '.length % ' + n + ' === 0' +
                                    ' && ' + VALUE + '.length<=' + n * size, 'invalid vector, should have length of ' + (size === 1 ? '' : 'n * ') + n, env.commandStr);
                            }
                        }
                        function checkTexture(target) {
                            check$1(!Array.isArray(VALUE), 'must not specify a value type');
                            emitCheck('typeof ' + VALUE + '==="function"&&' +
                                VALUE + '._reglType==="texture' +
                                (target === GL_TEXTURE_2D$3 ? '2d' : 'Cube') + '"', 'invalid texture type', env.commandStr);
                        }
                        switch (type) {
                            case GL_INT$3:
                                checkType('number', size);
                                break;
                            case GL_INT_VEC2:
                                checkVector(2, 'number', size);
                                break;
                            case GL_INT_VEC3:
                                checkVector(3, 'number', size);
                                break;
                            case GL_INT_VEC4:
                                checkVector(4, 'number', size);
                                break;
                            case GL_FLOAT$8:
                                checkType('number', size);
                                break;
                            case GL_FLOAT_VEC2:
                                checkVector(2, 'number', size);
                                break;
                            case GL_FLOAT_VEC3:
                                checkVector(3, 'number', size);
                                break;
                            case GL_FLOAT_VEC4:
                                checkVector(4, 'number', size);
                                break;
                            case GL_BOOL:
                                checkType('boolean', size);
                                break;
                            case GL_BOOL_VEC2:
                                checkVector(2, 'boolean', size);
                                break;
                            case GL_BOOL_VEC3:
                                checkVector(3, 'boolean', size);
                                break;
                            case GL_BOOL_VEC4:
                                checkVector(4, 'boolean', size);
                                break;
                            case GL_FLOAT_MAT2:
                                checkVector(4, 'number', size);
                                break;
                            case GL_FLOAT_MAT3:
                                checkVector(9, 'number', size);
                                break;
                            case GL_FLOAT_MAT4:
                                checkVector(16, 'number', size);
                                break;
                            case GL_SAMPLER_2D:
                                checkTexture(GL_TEXTURE_2D$3);
                                break;
                            case GL_SAMPLER_CUBE:
                                checkTexture(GL_TEXTURE_CUBE_MAP$2);
                                break;
                        }
                    });
                    var unroll = 1;
                    switch (type) {
                        case GL_SAMPLER_2D:
                        case GL_SAMPLER_CUBE:
                            var TEX = scope.def(VALUE, '._texture');
                            scope(GL, '.uniform1i(', LOCATION, ',', TEX, '.bind());');
                            scope.exit(TEX, '.unbind();');
                            continue;
                        case GL_INT$3:
                        case GL_BOOL:
                            infix = '1i';
                            break;
                        case GL_INT_VEC2:
                        case GL_BOOL_VEC2:
                            infix = '2i';
                            unroll = 2;
                            break;
                        case GL_INT_VEC3:
                        case GL_BOOL_VEC3:
                            infix = '3i';
                            unroll = 3;
                            break;
                        case GL_INT_VEC4:
                        case GL_BOOL_VEC4:
                            infix = '4i';
                            unroll = 4;
                            break;
                        case GL_FLOAT$8:
                            infix = '1f';
                            break;
                        case GL_FLOAT_VEC2:
                            infix = '2f';
                            unroll = 2;
                            break;
                        case GL_FLOAT_VEC3:
                            infix = '3f';
                            unroll = 3;
                            break;
                        case GL_FLOAT_VEC4:
                            infix = '4f';
                            unroll = 4;
                            break;
                        case GL_FLOAT_MAT2:
                            infix = 'Matrix2fv';
                            break;
                        case GL_FLOAT_MAT3:
                            infix = 'Matrix3fv';
                            break;
                        case GL_FLOAT_MAT4:
                            infix = 'Matrix4fv';
                            break;
                    }
                    if (infix.indexOf('Matrix') === -1 && size > 1) {
                        infix += 'v';
                        unroll = 1;
                    }
                    if (infix.charAt(0) === 'M') {
                        scope(GL, '.uniform', infix, '(', LOCATION, ',');
                        var matSize = Math.pow(type - GL_FLOAT_MAT2 + 2, 2);
                        var STORAGE = env.global.def('new Float32Array(', matSize, ')');
                        if (Array.isArray(VALUE)) {
                            scope('false,(', loop(matSize, function (i) {
                                return STORAGE + '[' + i + ']=' + VALUE[i];
                            }), ',', STORAGE, ')');
                        }
                        else {
                            scope('false,(Array.isArray(', VALUE, ')||', VALUE, ' instanceof Float32Array)?', VALUE, ':(', loop(matSize, function (i) {
                                return STORAGE + '[' + i + ']=' + VALUE + '[' + i + ']';
                            }), ',', STORAGE, ')');
                        }
                        scope(');');
                    }
                    else if (unroll > 1) {
                        var prev = [];
                        var cur = [];
                        for (var j = 0; j < unroll; ++j) {
                            if (Array.isArray(VALUE)) {
                                cur.push(VALUE[j]);
                            }
                            else {
                                cur.push(scope.def(VALUE + '[' + j + ']'));
                            }
                            if (isBatchInnerLoop) {
                                prev.push(scope.def());
                            }
                        }
                        if (isBatchInnerLoop) {
                            scope('if(!', env.batchId, '||', prev.map(function (p, i) {
                                return p + '!==' + cur[i];
                            }).join('||'), '){', prev.map(function (p, i) {
                                return p + '=' + cur[i] + ';';
                            }).join(''));
                        }
                        scope(GL, '.uniform', infix, '(', LOCATION, ',', cur.join(','), ');');
                        if (isBatchInnerLoop) {
                            scope('}');
                        }
                    }
                    else {
                        check$1(!Array.isArray(VALUE), 'uniform value must not be an array');
                        if (isBatchInnerLoop) {
                            var prevS = scope.def();
                            scope('if(!', env.batchId, '||', prevS, '!==', VALUE, '){', prevS, '=', VALUE, ';');
                        }
                        scope(GL, '.uniform', infix, '(', LOCATION, ',', VALUE, ');');
                        if (isBatchInnerLoop) {
                            scope('}');
                        }
                    }
                }
            }