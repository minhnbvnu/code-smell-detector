function redefined_within_scope(def, scope) {
                    if (def.global)
                        return false;
                    let cur_scope = def.scope;
                    while (cur_scope && cur_scope !== scope) {
                        if (cur_scope.variables.has(def.name)) {
                            return true;
                        }
                        cur_scope = cur_scope.parent_scope;
                    }
                    return false;
                }