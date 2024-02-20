function isClassRefInClassDecorator(variable, reference) {
        if (variable.defs[0].type !== scope_manager_1.DefinitionType.ClassName) {
            return false;
        }
        if (!variable.defs[0].node.decorators ||
            variable.defs[0].node.decorators.length === 0) {
            return false;
        }
        for (const deco of variable.defs[0].node.decorators) {
            if (reference.identifier.range[0] >= deco.range[0] &&
                reference.identifier.range[1] <= deco.range[1]) {
                return true;
            }
        }
        return false;
    }