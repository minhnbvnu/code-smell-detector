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