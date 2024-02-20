function isNonCommutativeOperatorWithShorthand(operator) {
        return ["+", "-", "/", "%", "<<", ">>", ">>>", "**"].includes(operator);
    }