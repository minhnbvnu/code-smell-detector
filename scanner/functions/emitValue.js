function emitValue(name) {
                    var defn = drawOptions[name];
                    if (defn) {
                        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
                            return defn.append(env, inner);
                        }
                        else {
                            return defn.append(env, outer);
                        }
                    }
                    else {
                        return outer.def(DRAW_STATE, '.', name);
                    }
                }