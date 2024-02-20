function isBitwiseOperatorOrHigher(kind) {
            return isBitwiseOperator(kind) || isEqualityOperatorOrHigher(kind);
        }