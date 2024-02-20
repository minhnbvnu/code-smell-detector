function isOuterClass(variable, reference) {
        return (variable.defs[0].type === scope_manager_1.DefinitionType.ClassName &&
            variable.scope.variableScope !== reference.from.variableScope);
    }