function isUnused(name, initialScope = context.getScope()) {
                var _a;
                let variable = null;
                let scope = initialScope;
                while (scope) {
                    variable = (_a = scope.set.get(name)) !== null && _a !== void 0 ? _a : null;
                    if (variable) {
                        break;
                    }
                    scope = scope.upper;
                }
                if (!variable) {
                    return false;
                }
                return unusedVariables.has(variable);
            }