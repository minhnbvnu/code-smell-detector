function isOuterEnum(variable, reference) {
        return (variable.defs[0].type === scope_manager_1.DefinitionType.TSEnumName &&
            variable.scope.variableScope !== reference.from.variableScope);
    }