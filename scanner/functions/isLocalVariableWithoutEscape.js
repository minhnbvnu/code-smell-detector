function isLocalVariableWithoutEscape(variable, isMemberAccess) {
        if (!variable) {
            return false; // A global variable which was not defined.
        }
        // If the reference is a property access and the variable is a parameter, it handles the variable is not local.
        if (isMemberAccess && variable.defs.some(d => d.type === "Parameter")) {
            return false;
        }
        const functionScope = variable.scope.variableScope;
        return variable.references.every(reference => reference.from.variableScope === functionScope);
    }