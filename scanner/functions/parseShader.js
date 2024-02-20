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