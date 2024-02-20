function getVariableOfArguments(scope) {
        const variables = scope.variables;
        for (let i = 0; i < variables.length; ++i) {
            const variable = variables[i];
            if (variable.name === "arguments") {
                /*
                 * If there was a parameter which is named "arguments", the implicit "arguments" is not defined.
                 * So does fast return with null.
                 */
                return (variable.identifiers.length === 0) ? variable : null;
            }
        }
        /* c8 ignore next */
        return null;
    }