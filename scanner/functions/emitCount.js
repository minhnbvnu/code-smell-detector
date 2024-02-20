function emitCount() {
                    var defn = drawOptions.count;
                    var COUNT;
                    var scope = outer;
                    if (defn) {
                        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
                            scope = inner;
                        }
                        COUNT = defn.append(env, scope);
                        check$1.optional(function () {
                            if (defn.MISSING) {
                                env.assert(outer, 'false', 'missing vertex count');
                            }
                            if (defn.DYNAMIC) {
                                env.assert(scope, COUNT + '>=0', 'missing vertex count');
                            }
                        });
                    }
                    else {
                        COUNT = scope.def(DRAW_STATE, '.', S_COUNT);
                        check$1.optional(function () {
                            env.assert(scope, COUNT + '>=0', 'missing vertex count');
                        });
                    }
                    return COUNT;
                }