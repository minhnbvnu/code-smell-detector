function anySignatureIsThenableType(checker, node, type) {
        for (const signature of type.getCallSignatures()) {
            const returnType = signature.getReturnType();
            if (tsutils.isThenableType(checker, node, returnType)) {
                return true;
            }
        }
        return false;
    }