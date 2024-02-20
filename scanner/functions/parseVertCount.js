function parseVertCount() {
                    if (S_COUNT in staticOptions) {
                        var count = staticOptions[S_COUNT] | 0;
                        staticDraw.count = count;
                        check$1.command(typeof count === 'number' && count >= 0, 'invalid vertex count', env.commandStr);
                        return createStaticDecl(function () {
                            return count;
                        });
                    }
                    else if (S_COUNT in dynamicOptions) {
                        var dynCount = dynamicOptions[S_COUNT];
                        return createDynamicDecl(dynCount, function (env, scope) {
                            var result = env.invoke(scope, dynCount);
                            check$1.optional(function () {
                                env.assert(scope, 'typeof ' + result + '==="number"&&' +
                                    result + '>=0&&' +
                                    result + '===(' + result + '|0)', 'invalid vertex count');
                            });
                            return result;
                        });
                    }
                    else if (elementsActive) {
                        if (isStatic(elements)) {
                            if (elements) {
                                if (OFFSET) {
                                    return new Declaration(OFFSET.thisDep, OFFSET.contextDep, OFFSET.propDep, function (env, scope) {
                                        var result = scope.def(env.ELEMENTS, '.vertCount-', env.OFFSET);
                                        check$1.optional(function () {
                                            env.assert(scope, result + '>=0', 'invalid vertex offset/element buffer too small');
                                        });
                                        return result;
                                    });
                                }
                                else {
                                    return createStaticDecl(function (env, scope) {
                                        return scope.def(env.ELEMENTS, '.vertCount');
                                    });
                                }
                            }
                            else {
                                var result = createStaticDecl(function () {
                                    return -1;
                                });
                                check$1.optional(function () {
                                    result.MISSING = true;
                                });
                                return result;
                            }
                        }
                        else {
                            var variable = new Declaration(elements.thisDep || OFFSET.thisDep, elements.contextDep || OFFSET.contextDep, elements.propDep || OFFSET.propDep, function (env, scope) {
                                var elements = env.ELEMENTS;
                                if (env.OFFSET) {
                                    return scope.def(elements, '?', elements, '.vertCount-', env.OFFSET, ':-1');
                                }
                                return scope.def(elements, '?', elements, '.vertCount:-1');
                            });
                            check$1.optional(function () {
                                variable.DYNAMIC = true;
                            });
                            return variable;
                        }
                    }
                    else if (vaoActive) {
                        var countVariable = new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function (env, scope) {
                            return scope.def(env.shared.vao, '.currentVAO?', env.shared.vao, '.currentVAO.count:-1');
                        });
                        return countVariable;
                    }
                    return null;
                }