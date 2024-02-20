function isFromSeparateExecutionContext(reference) {
        const variable = reference.resolved;
        let scope = reference.from;
        // Scope#variableScope represents execution context
        while (variable.scope.variableScope !== scope.variableScope) {
            if (isClassStaticInitializerScope(scope.variableScope)) {
                scope = scope.variableScope.upper;
            }
            else {
                return true;
            }
        }
        return false;
    }