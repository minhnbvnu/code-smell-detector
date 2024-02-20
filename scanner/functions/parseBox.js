function parseBox(param) {
                    if (param in staticOptions) {
                        var box = staticOptions[param];
                        check$1.commandType(box, 'object', 'invalid ' + param, env.commandStr);
                        var isStatic = true;
                        var x = box.x | 0;
                        var y = box.y | 0;
                        var w, h;
                        if ('width' in box) {
                            w = box.width | 0;
                            check$1.command(w >= 0, 'invalid ' + param, env.commandStr);
                        }
                        else {
                            isStatic = false;
                        }
                        if ('height' in box) {
                            h = box.height | 0;
                            check$1.command(h >= 0, 'invalid ' + param, env.commandStr);
                        }
                        else {
                            isStatic = false;
                        }
                        return new Declaration(!isStatic && framebuffer && framebuffer.thisDep, !isStatic && framebuffer && framebuffer.contextDep, !isStatic && framebuffer && framebuffer.propDep, function (env, scope) {
                            var CONTEXT = env.shared.context;
                            var BOX_W = w;
                            if (!('width' in box)) {
                                BOX_W = scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', x);
                            }
                            var BOX_H = h;
                            if (!('height' in box)) {
                                BOX_H = scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', y);
                            }
                            return [x, y, BOX_W, BOX_H];
                        });
                    }
                    else if (param in dynamicOptions) {
                        var dynBox = dynamicOptions[param];
                        var result = createDynamicDecl(dynBox, function (env, scope) {
                            var BOX = env.invoke(scope, dynBox);
                            check$1.optional(function () {
                                env.assert(scope, BOX + '&&typeof ' + BOX + '==="object"', 'invalid ' + param);
                            });
                            var CONTEXT = env.shared.context;
                            var BOX_X = scope.def(BOX, '.x|0');
                            var BOX_Y = scope.def(BOX, '.y|0');
                            var BOX_W = scope.def('"width" in ', BOX, '?', BOX, '.width|0:', '(', CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', BOX_X, ')');
                            var BOX_H = scope.def('"height" in ', BOX, '?', BOX, '.height|0:', '(', CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', BOX_Y, ')');
                            check$1.optional(function () {
                                env.assert(scope, BOX_W + '>=0&&' +
                                    BOX_H + '>=0', 'invalid ' + param);
                            });
                            return [BOX_X, BOX_Y, BOX_W, BOX_H];
                        });
                        if (framebuffer) {
                            result.thisDep = result.thisDep || framebuffer.thisDep;
                            result.contextDep = result.contextDep || framebuffer.contextDep;
                            result.propDep = result.propDep || framebuffer.propDep;
                        }
                        return result;
                    }
                    else if (framebuffer) {
                        return new Declaration(framebuffer.thisDep, framebuffer.contextDep, framebuffer.propDep, function (env, scope) {
                            var CONTEXT = env.shared.context;
                            return [
                                0, 0,
                                scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH),
                                scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT)
                            ];
                        });
                    }
                    else {
                        return null;
                    }
                }