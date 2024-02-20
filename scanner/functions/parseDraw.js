function parseDraw(options, env) {
                var staticOptions = options.static;
                var dynamicOptions = options.dynamic;
                // TODO: should use VAO to get default values for offset properties
                // should move vao parse into here and out of the old stuff
                var staticDraw = {};
                var vaoActive = false;
                function parseVAO() {
                    if (S_VAO in staticOptions) {
                        var vao = staticOptions[S_VAO];
                        if (vao !== null && attributeState.getVAO(vao) === null) {
                            vao = attributeState.createVAO(vao);
                        }
                        vaoActive = true;
                        staticDraw.vao = vao;
                        return createStaticDecl(function (env) {
                            var vaoRef = attributeState.getVAO(vao);
                            if (vaoRef) {
                                return env.link(vaoRef);
                            }
                            else {
                                return 'null';
                            }
                        });
                    }
                    else if (S_VAO in dynamicOptions) {
                        vaoActive = true;
                        var dyn = dynamicOptions[S_VAO];
                        return createDynamicDecl(dyn, function (env, scope) {
                            var vaoRef = env.invoke(scope, dyn);
                            return scope.def(env.shared.vao + '.getVAO(' + vaoRef + ')');
                        });
                    }
                    return null;
                }
                var vao = parseVAO();
                var elementsActive = false;
                function parseElements() {
                    if (S_ELEMENTS in staticOptions) {
                        var elements = staticOptions[S_ELEMENTS];
                        staticDraw.elements = elements;
                        if (isBufferArgs(elements)) {
                            var e = staticDraw.elements = elementState.create(elements, true);
                            elements = elementState.getElements(e);
                            elementsActive = true;
                        }
                        else if (elements) {
                            elements = elementState.getElements(elements);
                            elementsActive = true;
                            check$1.command(elements, 'invalid elements', env.commandStr);
                        }
                        var result = createStaticDecl(function (env, scope) {
                            if (elements) {
                                var result = env.link(elements);
                                env.ELEMENTS = result;
                                return result;
                            }
                            env.ELEMENTS = null;
                            return null;
                        });
                        result.value = elements;
                        return result;
                    }
                    else if (S_ELEMENTS in dynamicOptions) {
                        elementsActive = true;
                        var dyn = dynamicOptions[S_ELEMENTS];
                        return createDynamicDecl(dyn, function (env, scope) {
                            var shared = env.shared;
                            var IS_BUFFER_ARGS = shared.isBufferArgs;
                            var ELEMENT_STATE = shared.elements;
                            var elementDefn = env.invoke(scope, dyn);
                            var elements = scope.def('null');
                            var elementStream = scope.def(IS_BUFFER_ARGS, '(', elementDefn, ')');
                            var ifte = env.cond(elementStream)
                                .then(elements, '=', ELEMENT_STATE, '.createStream(', elementDefn, ');')
                                .else(elements, '=', ELEMENT_STATE, '.getElements(', elementDefn, ');');
                            check$1.optional(function () {
                                env.assert(ifte.else, '!' + elementDefn + '||' + elements, 'invalid elements');
                            });
                            scope.entry(ifte);
                            scope.exit(env.cond(elementStream)
                                .then(ELEMENT_STATE, '.destroyStream(', elements, ');'));
                            env.ELEMENTS = elements;
                            return elements;
                        });
                    }
                    else if (vaoActive) {
                        return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function (env, scope) {
                            return scope.def(env.shared.vao + '.currentVAO?' + env.shared.elements + '.getElements(' + env.shared.vao + '.currentVAO.elements):null');
                        });
                    }
                    return null;
                }
                var elements = parseElements();
                function parsePrimitive() {
                    if (S_PRIMITIVE in staticOptions) {
                        var primitive = staticOptions[S_PRIMITIVE];
                        staticDraw.primitive = primitive;
                        check$1.commandParameter(primitive, primTypes, 'invalid primitve', env.commandStr);
                        return createStaticDecl(function (env, scope) {
                            return primTypes[primitive];
                        });
                    }
                    else if (S_PRIMITIVE in dynamicOptions) {
                        var dynPrimitive = dynamicOptions[S_PRIMITIVE];
                        return createDynamicDecl(dynPrimitive, function (env, scope) {
                            var PRIM_TYPES = env.constants.primTypes;
                            var prim = env.invoke(scope, dynPrimitive);
                            check$1.optional(function () {
                                env.assert(scope, prim + ' in ' + PRIM_TYPES, 'invalid primitive, must be one of ' + Object.keys(primTypes));
                            });
                            return scope.def(PRIM_TYPES, '[', prim, ']');
                        });
                    }
                    else if (elementsActive) {
                        if (isStatic(elements)) {
                            if (elements.value) {
                                return createStaticDecl(function (env, scope) {
                                    return scope.def(env.ELEMENTS, '.primType');
                                });
                            }
                            else {
                                return createStaticDecl(function () {
                                    return GL_TRIANGLES$1;
                                });
                            }
                        }
                        else {
                            return new Declaration(elements.thisDep, elements.contextDep, elements.propDep, function (env, scope) {
                                var elements = env.ELEMENTS;
                                return scope.def(elements, '?', elements, '.primType:', GL_TRIANGLES$1);
                            });
                        }
                    }
                    else if (vaoActive) {
                        return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function (env, scope) {
                            return scope.def(env.shared.vao + '.currentVAO?' + env.shared.vao + '.currentVAO.primitive:' + GL_TRIANGLES$1);
                        });
                    }
                    return null;
                }
                function parseParam(param, isOffset) {
                    if (param in staticOptions) {
                        var value = staticOptions[param] | 0;
                        if (isOffset) {
                            staticDraw.offset = value;
                        }
                        else {
                            staticDraw.instances = value;
                        }
                        check$1.command(!isOffset || value >= 0, 'invalid ' + param, env.commandStr);
                        return createStaticDecl(function (env, scope) {
                            if (isOffset) {
                                env.OFFSET = value;
                            }
                            return value;
                        });
                    }
                    else if (param in dynamicOptions) {
                        var dynValue = dynamicOptions[param];
                        return createDynamicDecl(dynValue, function (env, scope) {
                            var result = env.invoke(scope, dynValue);
                            if (isOffset) {
                                env.OFFSET = result;
                                check$1.optional(function () {
                                    env.assert(scope, result + '>=0', 'invalid ' + param);
                                });
                            }
                            return result;
                        });
                    }
                    else if (isOffset) {
                        if (elementsActive) {
                            return createStaticDecl(function (env, scope) {
                                env.OFFSET = 0;
                                return 0;
                            });
                        }
                        else if (vaoActive) {
                            return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function (env, scope) {
                                return scope.def(env.shared.vao + '.currentVAO?' + env.shared.vao + '.currentVAO.offset:0');
                            });
                        }
                    }
                    else if (vaoActive) {
                        return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function (env, scope) {
                            return scope.def(env.shared.vao + '.currentVAO?' + env.shared.vao + '.currentVAO.instances:-1');
                        });
                    }
                    return null;
                }
                var OFFSET = parseParam(S_OFFSET, true);
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
                var primitive = parsePrimitive();
                var count = parseVertCount();
                var instances = parseParam(S_INSTANCES, false);
                return {
                    elements: elements,
                    primitive: primitive,
                    count: count,
                    instances: instances,
                    offset: OFFSET,
                    vao: vao,
                    vaoActive: vaoActive,
                    elementsActive: elementsActive,
                    // static draw props
                    static: staticDraw
                };
            }