function hasMatchingSignature(type, matcher) {
        for (const t of tsutils.unionTypeParts(type)) {
            if (t.getCallSignatures().some(matcher)) {
                return true;
            }
        }
        return false;
    }