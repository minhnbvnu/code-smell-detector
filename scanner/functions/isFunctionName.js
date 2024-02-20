function isFunctionName(variable) {
        return variable && variable.defs[0].type === "FunctionName";
    }