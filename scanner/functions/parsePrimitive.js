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