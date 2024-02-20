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