function scope_encloses_variables_in_this_scope(scope, pulled_scope) {
            for (const enclosed of pulled_scope.enclosed) {
                if (pulled_scope.variables.has(enclosed.name)) {
                    continue;
                }
                const looked_up = scope.find_variable(enclosed.name);
                if (looked_up) {
                    if (looked_up === enclosed)
                        continue;
                    return true;
                }
            }
            return false;
        }