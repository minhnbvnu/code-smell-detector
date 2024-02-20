function shadows(my_scope, lvalues) {
                    for (const { def } of lvalues.values()) {
                        const looked_up = my_scope.find_variable(def.name);
                        if (looked_up) {
                            if (looked_up === def)
                                continue;
                            return true;
                        }
                    }
                    return false;
                }