function isLogicalOperatorOrHigher(kind) {
            return isLogicalOperator2(kind) || isBitwiseOperatorOrHigher(kind);
        }