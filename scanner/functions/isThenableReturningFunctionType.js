function isThenableReturningFunctionType(checker, node, type) {
        for (const subType of tsutils.unionTypeParts(type)) {
            if (anySignatureIsThenableType(checker, node, subType)) {
                return true;
            }
        }
        return false;
    }