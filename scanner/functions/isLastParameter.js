function isLastParameter(func, parameter, isFixAll) {
            const parameters = func.parameters;
            const index = parameters.indexOf(parameter);
            Debug.assert(index !== -1, "The parameter should already be in the list");
            return isFixAll ? parameters.slice(index + 1).every((p) => isIdentifier(p.name) && !p.symbol.isReferenced) : index === parameters.length - 1;
        }