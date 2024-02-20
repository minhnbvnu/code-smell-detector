function isReferencedInClosure(variable) {
        const enclosingFunctionScope = getEnclosingFunctionScope(variable.scope);
        return variable.references.some(reference => getEnclosingFunctionScope(reference.from) !== enclosingFunctionScope);
    }