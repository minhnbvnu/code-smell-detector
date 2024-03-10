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