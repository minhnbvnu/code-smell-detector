function parseParam(parseStatic, parseDynamic) {
                        if (prop in staticOptions) {
                            var value = parseStatic(staticOptions[prop]);
                            STATE[param] = createStaticDecl(function () {
                                return value;
                            });
                        }
                        else if (prop in dynamicOptions) {
                            var dyn = dynamicOptions[prop];
                            STATE[param] = createDynamicDecl(dyn, function (env, scope) {
                                return parseDynamic(env, scope, env.invoke(scope, dyn));
                            });
                        }
                    }