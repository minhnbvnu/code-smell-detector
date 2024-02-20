function isDefinitionWithAssignment(definition) {
        if (definition.type !== scope_manager_1.DefinitionType.Variable) {
            return false;
        }
        const variableDeclarator = definition.node;
        return (variableDeclarator.definite === true || variableDeclarator.init != null);
    }