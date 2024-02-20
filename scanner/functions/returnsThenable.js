function returnsThenable(checker, node) {
        const type = checker.getApparentType(checker.getTypeAtLocation(node));
        if (anySignatureIsThenableType(checker, node, type)) {
            return true;
        }
        return false;
    }