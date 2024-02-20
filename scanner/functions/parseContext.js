function parseContext(context) {
                var staticContext = context.static;
                var dynamicContext = context.dynamic;
                var result = {};
                Object.keys(staticContext).forEach(function (name) {
                    var value = staticContext[name];
                    result[name] = createStaticDecl(function (env, scope) {
                        if (typeof value === 'number' || typeof value === 'boolean') {
                            return '' + value;
                        }
                        else {
                            return env.link(value);
                        }
                    });
                });
                Object.keys(dynamicContext).forEach(function (name) {
                    var dyn = dynamicContext[name];
                    result[name] = createDynamicDecl(dyn, function (env, scope) {
                        return env.invoke(scope, dyn);
                    });
                });
                return result;
            }