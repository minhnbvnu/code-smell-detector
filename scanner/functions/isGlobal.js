function isGlobal(scope) {
        if (scope == null) {
            return false;
        }
        return (scope.type === utils_1.TSESLint.Scope.ScopeType.global ||
            scope.type === utils_1.TSESLint.Scope.ScopeType.module);
    }