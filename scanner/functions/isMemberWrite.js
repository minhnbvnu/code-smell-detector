function isMemberWrite(id, scope) {
        const { parent } = id;
        return ((parent.type === "MemberExpression" &&
            parent.object === id &&
            (isAssignmentLeft(parent) ||
                isOperandOfMutationUnaryOperator(parent) ||
                isIterationVariable(parent))) ||
            isArgumentOfWellKnownMutationFunction(id, scope));
    }