function hasAssignmentBeforeNode(variable, node) {
        return (variable.references.some(ref => ref.isWrite() && ref.identifier.range[1] < node.range[1]) ||
            variable.defs.some(def => isDefinitionWithAssignment(def) && def.node.range[1] < node.range[1]));
    }