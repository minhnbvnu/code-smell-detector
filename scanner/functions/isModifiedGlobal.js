function isModifiedGlobal(variable) {
        return (variable == null ||
            variable.defs.length !== 0 ||
            variable.references.some((r) => r.isWrite()));
    }