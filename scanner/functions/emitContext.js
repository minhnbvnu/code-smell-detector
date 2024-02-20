function emitContext(env, scope, context) {
                var shared = env.shared;
                var CONTEXT = shared.context;
                var contextEnter = env.scope();
                Object.keys(context).forEach(function (name) {
                    scope.save(CONTEXT, '.' + name);
                    var defn = context[name];
                    var value = defn.append(env, scope);
                    if (Array.isArray(value)) {
                        contextEnter(CONTEXT, '.', name, '=[', value.join(), '];');
                    }
                    else {
                        contextEnter(CONTEXT, '.', name, '=', value, ';');
                    }
                });
                scope(contextEnter);
            }