function isAdditiveOperatorOrHigher(kind) {
            return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind);
        }