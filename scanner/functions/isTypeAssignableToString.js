function isTypeAssignableToString(checker, type) {
        return isTypeAssignableTo(checker, type, ts.TypeFlags.StringLike);
    }