function getIdentifierIfShouldBeConst(variable, ignoreReadBeforeAssign) {
        if (variable.eslintUsed && variable.scope.type === "global") {
            return null;
        }
        // Finds the unique WriteReference.
        let writer = null;
        let isReadBeforeInit = false;
        const references = variable.references;
        for (let i = 0; i < references.length; ++i) {
            const reference = references[i];
            if (reference.isWrite()) {
                const isReassigned = (writer !== null &&
                    writer.identifier !== reference.identifier);
                if (isReassigned) {
                    return null;
                }
                const destructuringHost = getDestructuringHost(reference);
                if (destructuringHost !== null && destructuringHost.left !== void 0) {
                    const leftNode = destructuringHost.left;
                    let hasOuterVariables = false, hasNonIdentifiers = false;
                    if (leftNode.type === "ObjectPattern") {
                        const properties = leftNode.properties;
                        hasOuterVariables = properties
                            .filter(prop => prop.value)
                            .map(prop => prop.value.name)
                            .some(name => isOuterVariableInDestructing(name, variable.scope));
                        hasNonIdentifiers = hasMemberExpressionAssignment(leftNode);
                    }
                    else if (leftNode.type === "ArrayPattern") {
                        const elements = leftNode.elements;
                        hasOuterVariables = elements
                            .map(element => element && element.name)
                            .some(name => isOuterVariableInDestructing(name, variable.scope));
                        hasNonIdentifiers = hasMemberExpressionAssignment(leftNode);
                    }
                    if (hasOuterVariables || hasNonIdentifiers) {
                        return null;
                    }
                }
                writer = reference;
            }
            else if (reference.isRead() && writer === null) {
                if (ignoreReadBeforeAssign) {
                    return null;
                }
                isReadBeforeInit = true;
            }
        }
        /*
         * If the assignment is from a different scope, ignore it.
         * If the assignment cannot change to a declaration, ignore it.
         */
        const shouldBeConst = (writer !== null &&
            writer.from === variable.scope &&
            canBecomeVariableDeclaration(writer.identifier));
        if (!shouldBeConst) {
            return null;
        }
        if (isReadBeforeInit) {
            return variable.defs[0].name;
        }
        return writer.identifier;
    }