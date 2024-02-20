function isTypedef(variable) {
        return variable.defs[0].type === scope_manager_1.DefinitionType.Type;
    }