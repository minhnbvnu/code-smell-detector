function isRedeclared(variable) {
        return variable.defs.length >= 2;
    }