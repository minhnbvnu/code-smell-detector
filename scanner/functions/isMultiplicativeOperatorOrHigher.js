function isMultiplicativeOperatorOrHigher(kind) {
            return isExponentiationOperator(kind) || isMultiplicativeOperator(kind);
        }