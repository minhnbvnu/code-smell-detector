function parseUniforms(uniforms, env) {
                var staticUniforms = uniforms.static;
                var dynamicUniforms = uniforms.dynamic;
                var UNIFORMS = {};
                Object.keys(staticUniforms).forEach(function (name) {
                    var value = staticUniforms[name];
                    var result;
                    if (typeof value === 'number' ||
                        typeof value === 'boolean') {
                        result = createStaticDecl(function () {
                            return value;
                        });
                    }
                    else if (typeof value === 'function') {
                        var reglType = value._reglType;
                        if (reglType === 'texture2d' ||
                            reglType === 'textureCube') {
                            result = createStaticDecl(function (env) {
                                return env.link(value);
                            });
                        }
                        else if (reglType === 'framebuffer' ||
                            reglType === 'framebufferCube') {
                            check$1.command(value.color.length > 0, 'missing color attachment for framebuffer sent to uniform "' + name + '"', env.commandStr);
                            result = createStaticDecl(function (env) {
                                return env.link(value.color[0]);
                            });
                        }
                        else {
                            check$1.commandRaise('invalid data for uniform "' + name + '"', env.commandStr);
                        }
                    }
                    else if (isArrayLike(value)) {
                        result = createStaticDecl(function (env) {
                            var ITEM = env.global.def('[', loop(value.length, function (i) {
                                check$1.command(typeof value[i] === 'number' ||
                                    typeof value[i] === 'boolean', 'invalid uniform ' + name, env.commandStr);
                                return value[i];
                            }), ']');
                            return ITEM;
                        });
                    }
                    else {
                        check$1.commandRaise('invalid or missing data for uniform "' + name + '"', env.commandStr);
                    }
                    result.value = value;
                    UNIFORMS[name] = result;
                });
                Object.keys(dynamicUniforms).forEach(function (key) {
                    var dyn = dynamicUniforms[key];
                    UNIFORMS[key] = createDynamicDecl(dyn, function (env, scope) {
                        return env.invoke(scope, dyn);
                    });
                });
                return UNIFORMS;
            }