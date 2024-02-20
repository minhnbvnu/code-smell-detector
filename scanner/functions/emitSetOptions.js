function emitSetOptions(env, scope, options, filter) {
                var shared = env.shared;
                var CURRENT_VARS = env.current;
                var CURRENT_STATE = shared.current;
                var GL = shared.gl;
                sortState(Object.keys(options)).forEach(function (param) {
                    var defn = options[param];
                    if (filter && !filter(defn)) {
                        return;
                    }
                    var variable = defn.append(env, scope);
                    if (GL_FLAGS[param]) {
                        var flag = GL_FLAGS[param];
                        if (isStatic(defn)) {
                            if (variable) {
                                scope(GL, '.enable(', flag, ');');
                            }
                            else {
                                scope(GL, '.disable(', flag, ');');
                            }
                        }
                        else {
                            scope(env.cond(variable)
                                .then(GL, '.enable(', flag, ');')
                                .else(GL, '.disable(', flag, ');'));
                        }
                        scope(CURRENT_STATE, '.', param, '=', variable, ';');
                    }
                    else if (isArrayLike(variable)) {
                        var CURRENT = CURRENT_VARS[param];
                        scope(GL, '.', GL_VARIABLES[param], '(', variable, ');', variable.map(function (v, i) {
                            return CURRENT + '[' + i + ']=' + v;
                        }).join(';'), ';');
                    }
                    else {
                        scope(GL, '.', GL_VARIABLES[param], '(', variable, ');', CURRENT_STATE, '.', param, '=', variable, ';');
                    }
                });
            }