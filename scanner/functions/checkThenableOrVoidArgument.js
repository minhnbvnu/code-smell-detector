function checkThenableOrVoidArgument(checker, node, type, index, thenableReturnIndices, voidReturnIndices) {
        if (isThenableReturningFunctionType(checker, node.expression, type)) {
            thenableReturnIndices.add(index);
        }
        else if (isVoidReturningFunctionType(checker, node.expression, type)) {
            // If a certain argument accepts both thenable and void returns,
            // a promise-returning function is valid
            if (!thenableReturnIndices.has(index)) {
                voidReturnIndices.add(index);
            }
        }
    }