function isVoidReturningFunctionType(checker, node, type) {
        let hadVoidReturn = false;
        for (const subType of tsutils.unionTypeParts(type)) {
            for (const signature of subType.getCallSignatures()) {
                const returnType = signature.getReturnType();
                // If a certain positional argument accepts both thenable and void returns,
                // a promise-returning function is valid
                if (tsutils.isThenableType(checker, node, returnType)) {
                    return false;
                }
                hadVoidReturn || (hadVoidReturn = tsutils.isTypeFlagSet(returnType, ts.TypeFlags.Void));
            }
        }
        return hadVoidReturn;
    }