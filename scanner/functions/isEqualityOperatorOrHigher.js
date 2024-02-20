function isEqualityOperatorOrHigher(kind) {
            return isEqualityOperator(kind) || isRelationalOperatorOrHigher(kind);
        }