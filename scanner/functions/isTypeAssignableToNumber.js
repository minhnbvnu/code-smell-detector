function isTypeAssignableToNumber(checker, type) {
        return isTypeAssignableTo(checker, type, ts.TypeFlags.NumberLike);
    }