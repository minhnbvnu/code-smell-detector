function isOuterVariableInDestructing(name, initScope) {
        if (initScope.through.some(ref => ref.resolved && ref.resolved.name === name)) {
            return true;
        }
        const variable = astUtils.getVariableByName(initScope, name);
        if (variable !== null) {
            return variable.defs.some(def => def.type === "Parameter");
        }
        return false;
    }