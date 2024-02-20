function isSometimesThenable(checker, node) {
        const type = checker.getTypeAtLocation(node);
        for (const subType of tsutils.unionTypeParts(checker.getApparentType(type))) {
            if (tsutils.isThenableType(checker, node, subType)) {
                return true;
            }
        }
        return false;
    }