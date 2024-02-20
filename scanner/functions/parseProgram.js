function parseProgram(options, env, attribLocations) {
                var staticOptions = options.static;
                var dynamicOptions = options.dynamic;
                function parseShader(name) {
                    if (name in staticOptions) {
                        var id = stringStore.id(staticOptions[name]);
                        check$1.optional(function () {
                            shaderState.shader(shaderType[name], id, check$1.guessCommand());
                        });
                        var result = createStaticDecl(function () {
                            return id;
                        });
                        result.id = id;
                        return result;
                    }
                    else if (name in dynamicOptions) {
                        var dyn = dynamicOptions[name];
                        return createDynamicDecl(dyn, function (env, scope) {
                            var str = env.invoke(scope, dyn);
                            var id = scope.def(env.shared.strings, '.id(', str, ')');
                            check$1.optional(function () {
                                scope(env.shared.shader, '.shader(', shaderType[name], ',', id, ',', env.command, ');');
                            });
                            return id;
                        });
                    }
                    return null;
                }
                var frag = parseShader(S_FRAG);
                var vert = parseShader(S_VERT);
                var program = null;
                var progVar;
                if (isStatic(frag) && isStatic(vert)) {
                    program = shaderState.program(vert.id, frag.id, null, attribLocations);
                    progVar = createStaticDecl(function (env, scope) {
                        return env.link(program);
                    });
                }
                else {
                    progVar = new Declaration((frag && frag.thisDep) || (vert && vert.thisDep), (frag && frag.contextDep) || (vert && vert.contextDep), (frag && frag.propDep) || (vert && vert.propDep), function (env, scope) {
                        var SHADER_STATE = env.shared.shader;
                        var fragId;
                        if (frag) {
                            fragId = frag.append(env, scope);
                        }
                        else {
                            fragId = scope.def(SHADER_STATE, '.', S_FRAG);
                        }
                        var vertId;
                        if (vert) {
                            vertId = vert.append(env, scope);
                        }
                        else {
                            vertId = scope.def(SHADER_STATE, '.', S_VERT);
                        }
                        var progDef = SHADER_STATE + '.program(' + vertId + ',' + fragId;
                        check$1.optional(function () {
                            progDef += ',' + env.command;
                        });
                        return scope.def(progDef + ')');
                    });
                }
                return {
                    frag: frag,
                    vert: vert,
                    progVar: progVar,
                    program: program
                };
            }