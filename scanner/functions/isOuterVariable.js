function isOuterVariable(variable, reference) {
        return (variable.defs[0].type === scope_manager_1.DefinitionType.Variable &&
            variable.scope.variableScope !== reference.from.variableScope);
    }