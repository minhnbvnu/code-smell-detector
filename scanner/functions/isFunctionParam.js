function isFunctionParam(checker, param, node) {
        const type = checker.getApparentType(checker.getTypeOfSymbolAtLocation(param, node));
        for (const subType of tsutils.unionTypeParts(type)) {
            if (subType.getCallSignatures().length !== 0) {
                return true;
            }
        }
        return false;
    }